(function () {
    var c = document.getElementById('game');
    if (!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height, GROUND = H - 40;
    var cs = getComputedStyle(document.documentElement);
    function col(n, d) { return (cs.getPropertyValue(n) || d).trim() || d; }
    var INK = col('--text-primary', '#2A3347'), ACC = col('--accent', '#C4467A'),
        SKY = col('--sky', '#CFE6FB'), BLUSH = col('--blush', '#FADCE6');
    var scoreEl = document.getElementById('g-score'), bestEl = document.getElementById('g-best');
    var best = 0;
    try { best = parseInt(localStorage.getItem('skaterun-best') || '0', 10) || 0; } catch (e) {}
    bestEl.textContent = best;

    var LABELS = ['NaN', 'OOM', '404', 'bug', 'null'];
    var p, obs, speed, score, state, frame, nextGap;

    function reset() {
        p = { x: 70, y: GROUND, vy: 0, w: 34, h: 18 };
        obs = []; speed = 5; score = 0; frame = 0; nextGap = 90; state = 'idle';
    }
    function jump() {
        if (state === 'idle') state = 'run';
        if (state === 'over') { reset(); state = 'run'; return; }
        if (p.y >= GROUND) p.vy = -12.5;
    }
    function step() {
        frame++;
        speed = 5 + Math.min(score / 250, 5);
        p.vy += 0.7; p.y += p.vy;
        if (p.y > GROUND) { p.y = GROUND; p.vy = 0; }
        nextGap--;
        if (nextGap <= 0) {
            var h = 26 + Math.random() * 18;
            obs.push({ x: W + 10, w: 46, h: h, t: LABELS[Math.floor(Math.random() * LABELS.length)] });
            nextGap = 55 + Math.random() * 60 + (10 - speed) * 4;
        }
        for (var i = obs.length - 1; i >= 0; i--) {
            var o = obs[i]; o.x -= speed;
            if (o.x + o.w < 0) { obs.splice(i, 1); continue; }
            var px = p.x - p.w / 2 + 4, pw = p.w - 8, ptop = p.y - 44;
            if (px < o.x + o.w - 4 && px + pw > o.x + 4 && p.y > GROUND - o.h + 2 && ptop < GROUND) {
                state = 'over';
                if (score > best) { best = Math.floor(score); bestEl.textContent = best;
                    try { localStorage.setItem('skaterun-best', best); } catch (e) {} }
            }
        }
        score += speed / 12;
        scoreEl.textContent = Math.floor(score);
    }
    function draw() {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = SKY; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = BLUSH; ctx.fillRect(0, GROUND, W, H - GROUND);
        ctx.strokeStyle = INK; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(0, GROUND); ctx.lineTo(W, GROUND); ctx.stroke();
        // dashes for motion
        ctx.fillStyle = INK;
        for (var d = 0; d < W; d += 60) ctx.fillRect(((d - frame * speed) % W + W) % W, GROUND + 14, 20, 3);
        // obstacles
        ctx.font = '700 13px "JetBrains Mono", monospace'; ctx.textAlign = 'center';
        obs.forEach(function (o) {
            ctx.fillStyle = ACC; ctx.strokeStyle = INK; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.roundRect ? ctx.roundRect(o.x, GROUND - o.h, o.w, o.h, 8) : ctx.rect(o.x, GROUND - o.h, o.w, o.h);
            ctx.fill(); ctx.stroke();
            ctx.fillStyle = '#fff'; ctx.fillText(o.t, o.x + o.w / 2, GROUND - o.h / 2 + 4);
        });
        // skater
        var by = p.y, tilt = p.y < GROUND ? -0.15 : 0;
        ctx.save(); ctx.translate(p.x, by); ctx.rotate(tilt);
        ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.fillStyle = INK;
        ctx.fillRect(-p.w / 2, -8, p.w, 5);
        ctx.beginPath(); ctx.arc(-p.w / 2 + 6, -1, 4, 0, 7); ctx.arc(p.w / 2 - 6, -1, 4, 0, 7); ctx.fill();
        ctx.beginPath(); ctx.moveTo(0, -8); ctx.lineTo(0, -28); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, -22); ctx.lineTo(-9, -14); ctx.moveTo(0, -22); ctx.lineTo(9, -16); ctx.stroke();
        ctx.fillStyle = '#FFE0C2'; ctx.beginPath(); ctx.arc(0, -36, 8, 0, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = ACC; ctx.fillRect(-9, -46, 18, 6);
        ctx.restore();
        if (state !== 'run') {
            ctx.fillStyle = INK; ctx.font = '700 20px "Bricolage Grotesque", sans-serif';
            ctx.fillText(state === 'idle' ? 'Press space or tap to start' : 'Game over. Tap to retry', W / 2, 80);
        }
    }
    function loop() { if (state === 'run') step(); draw(); requestAnimationFrame(loop); }
    var inView = false;
    document.addEventListener('keydown', function (e) {
        if (e.code === 'Space' && inView) { e.preventDefault(); jump(); }
    });
    c.addEventListener('pointerdown', function (e) { e.preventDefault(); jump(); });
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) { inView = en[0].isIntersecting; }, { threshold: 0.4 }).observe(c);
    } else inView = true;
    reset(); loop();
})();
