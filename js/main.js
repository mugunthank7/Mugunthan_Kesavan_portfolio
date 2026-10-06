document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       NAVIGATION SCROLL EFFECT
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check in case of refresh midway down page
    handleScroll();

    /* ==========================================================================
       MOBILE MENU TOGGLE
       ========================================================================== */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-item');

    const toggleMenu = () => {
        mobileBtn.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    if (mobileBtn) {
        mobileBtn.addEventListener('click', toggleMenu);
    }

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileOverlay.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================================================
       SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });

});

/* ==========================================================================
   LINKEDIN SIDEBARS
   Reads data/linkedin.json and fills every <aside class="exp-sidebar" data-exp="...">
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const sidebars = document.querySelectorAll('.exp-sidebar[data-exp]');
    if (!sidebars.length) return;

    const el = (tag, cls, text) => {
        const n = document.createElement(tag);
        if (cls) n.className = cls;
        if (text) n.textContent = text;
        return n;
    };
    const VISIBLE = 2;
    const fmtDate = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    fetch('./data/linkedin.json')
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((data) => {
            sidebars.forEach((box) => {
                const posts = (data.experiences || {})[box.dataset.exp] || [];
                if (!posts.length) { box.hidden = true; return; }

                box.appendChild(el('p', 'li-title', 'On LinkedIn'));
                const list = el('div', 'li-list');
                posts.forEach((p) => {
                    const card = el('article', 'li-post');
                    if (list.children.length >= VISIBLE) { card.classList.add('li-extra'); card.hidden = true; }
                    card.appendChild(el('span', 'li-date', fmtDate(p.date)));
                    card.appendChild(el('h5', 'li-headline', p.headline));
                    card.appendChild(el('p', 'li-summary', p.summary));

                    if (p.highlight && p.highlight.text) {
                        const q = el('blockquote', 'li-comment');
                        q.appendChild(el('span', 'li-comment-tag', 'Highlighted comment'));
                        q.appendChild(el('p', 'li-comment-text', '“' + p.highlight.text + '”'));
                        if (p.highlight.author) q.appendChild(el('span', 'li-comment-by', '— ' + p.highlight.author));
                        card.appendChild(q);
                    }

                    const foot = el('div', 'li-foot');
                    const stats = [];
                    if (p.reactions) stats.push(p.reactions + ' reactions');
                    if (p.comments) stats.push(p.comments + ' comments');
                    foot.appendChild(el('span', 'li-stats', stats.join(' · ')));
                    const a = el('a', 'li-link', 'Read post →');
                    a.href = p.url; a.target = '_blank'; a.rel = 'noopener';
                    foot.appendChild(a);
                    card.appendChild(foot);
                    list.appendChild(card);
                });
                box.appendChild(list);
                const extras = list.querySelectorAll('.li-extra');
                if (extras.length) {
                    const btn = el('button', 'li-more', '+ ' + extras.length + ' more posts');
                    btn.type = 'button';
                    btn.addEventListener('click', () => {
                        const open = btn.dataset.open === '1';
                        extras.forEach((n) => { n.hidden = open; });
                        btn.dataset.open = open ? '0' : '1';
                        btn.textContent = open ? '+ ' + extras.length + ' more posts' : 'Show fewer';
                    });
                    box.appendChild(btn);
                }
            });
        })
        .catch(() => sidebars.forEach((b) => { b.hidden = true; }));
});
