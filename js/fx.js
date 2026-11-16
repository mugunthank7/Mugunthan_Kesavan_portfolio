(function () {
    var fine = matchMedia('(pointer: fine)').matches;
    var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // scroll progress
    var bar = document.querySelector('.progress');
    function onScroll() {
        var h = document.documentElement.scrollHeight - innerHeight;
        if (bar) bar.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
    }
    addEventListener('scroll', onScroll, { passive: true }); onScroll();

    // cursor blob
    var blob = document.querySelector('.blob');
    if (blob && fine && !calm) {
        var bx = innerWidth / 2, by = innerHeight / 2, tx = bx, ty = by;
        addEventListener('pointermove', function (e) { tx = e.clientX; ty = e.clientY; blob.classList.add('on'); });
        document.addEventListener('pointerover', function (e) {
            blob.classList.toggle('big', !!e.target.closest('a, button, .drag, .pol, [data-lightbox], .burst'));
        });
        (function loop() { bx += (tx - bx) * 0.18; by += (ty - by) * 0.18;
            blob.style.transform = 'translate(' + bx + 'px,' + by + 'px)'; requestAnimationFrame(loop); })();
    } else if (blob) blob.remove();

    // rotating roles
    var rot = document.querySelector('.rotator');
    if (rot) {
        var words = rot.dataset.words.split('|'), wi = 0, ci = words[0].length, del = true;
        if (!calm) setTimeout(function tick() {
            var w = words[wi];
            if (del) { ci--; if (ci === 0) { del = false; wi = (wi + 1) % words.length; } }
            else { ci++; if (ci === words[wi].length) { del = true; rot.textContent = words[wi]; return setTimeout(tick, 1800); } }
            rot.textContent = words[wi].slice(0, ci);
            setTimeout(tick, del ? 35 : 70);
        }, 2200);
    }

    // 3D tilt
    if (fine && !calm) document.querySelectorAll('.tilt3d').forEach(function (el) {
        el.addEventListener('pointermove', function (e) {
            var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
            el.style.transform = 'perspective(900px) rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 10) + 'deg) translateY(-4px)';
        });
        el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });

    // magnetic buttons
    if (fine && !calm) document.querySelectorAll('.btn-pop').forEach(function (b) {
        b.addEventListener('pointermove', function (e) {
            var r = b.getBoundingClientRect();
            b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.25) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.35) + 'px)';
        });
        b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });

    // counters
    var counters = document.querySelectorAll('.count');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (en) {
            en.forEach(function (e) {
                if (!e.isIntersecting) return; io.unobserve(e.target);
                var el = e.target, to = +el.dataset.to, from = +(el.dataset.from || 0), t0 = performance.now();
                (function step(t) { var p = Math.min(1, (t - t0) / 1400), k = 1 - Math.pow(1 - p, 3);
                    el.textContent = Math.round(from + (to - from) * k).toLocaleString(); if (p < 1) requestAnimationFrame(step); })(t0);
            });
        }, { threshold: 0.6 });
        counters.forEach(function (c) { io.observe(c); });
    }

    // emoji burst
    var EMO = ['🚀', '🛹', '🎸', '🤖', '✨', '🍕', '💡'];
    document.querySelectorAll('.burst').forEach(function (el) {
        el.addEventListener('click', function (e) {
            for (var i = 0; i < 14; i++) {
                var s = document.createElement('span'); s.className = 'emo'; s.textContent = EMO[i % EMO.length];
                s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px';
                var a = Math.random() * Math.PI * 2, d = 80 + Math.random() * 120;
                s.style.setProperty('--dx', Math.cos(a) * d + 'px'); s.style.setProperty('--dy', Math.sin(a) * d - 60 + 'px');
                document.body.appendChild(s); setTimeout(s.remove.bind(s), 1100);
            }
        });
    });

    // lightbox
    var lb = document.querySelector('.lightbox');
    function openLb(src, cap) { lb.querySelector('img').src = src; lb.querySelector('p').textContent = cap || ''; lb.hidden = false; }
    if (lb) {
        lb.addEventListener('click', function () { lb.hidden = true; });
        addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.hidden = true; });
        document.querySelectorAll('[data-lightbox]').forEach(function (im) {
            im.addEventListener('click', function () { openLb(im.src, im.dataset.cap || im.alt); });
        });
    }

    // draggable stickers + polaroids
    var zTop = 10;
    function makeDrag(el, onTap) {
        var sx, sy, ox = 0, oy = 0, moved = false, base = getComputedStyle(el).transform;
        base = base === 'none' ? '' : base;
        el.addEventListener('pointerdown', function (e) {
            if (!fine && el.classList.contains('pol') && innerWidth < 800) return;
            e.preventDefault(); el.setPointerCapture(e.pointerId); sx = e.clientX - ox; sy = e.clientY - oy; moved = false;
            el.style.zIndex = ++zTop; el.classList.add('dragging');
        });
        el.addEventListener('pointermove', function (e) {
            if (!el.hasPointerCapture(e.pointerId)) return;
            ox = e.clientX - sx; oy = e.clientY - sy; if (Math.abs(ox) + Math.abs(oy) > 4) moved = true;
            el.style.translate = ox + 'px ' + oy + 'px';
        });
        el.addEventListener('pointerup', function (e) {
            el.classList.remove('dragging');
            if (!moved && onTap) onTap();
        });
    }
    document.querySelectorAll('.drag').forEach(function (el) { makeDrag(el); });
    document.querySelectorAll('.pol').forEach(function (el) {
        var im = el.querySelector('img'), cap = el.querySelector('figcaption');
        makeDrag(el, function () { openLb(im.src, cap ? cap.textContent : im.alt); });
        if (!fine || innerWidth < 800) el.addEventListener('click', function () { openLb(im.src, cap ? cap.textContent : im.alt); });
    });
})();
