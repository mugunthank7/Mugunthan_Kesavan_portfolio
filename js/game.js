/* Skate Run: ollie, flip, grind. Time-based so it runs the same at 60Hz and 120Hz. */
(function () {
    var c = document.getElementById('game');
    if (!c) return;
    var ctx = c.getContext('2d');
    var W = 900, H = 320, GROUND = H - 56;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = W * dpr; c.height = H * dpr; ctx.scale(dpr, dpr);

    var cs = getComputedStyle(document.documentElement);
    function col(n, d) { var v = cs.getPropertyValue(n); return (v && v.trim()) || d; }
    var INK = col('--ink', '#1F2540'), PINK = col('--pop-pink', '#FF8FB8'), SKY = col('--pop-sky', '#8EC8FF'),
        MINT = col('--pop-mint', '#8BE3BE'), BUTTER = col('--pop-butter', '#FFD66B');
    var scoreEl = document.getElementById('g-score'), bestEl = document.getElementById('g-best');

    var best = 0;
    try { best = parseInt(localStorage.getItem('skaterun2-best') || '0', 10) || 0; } catch (e) {}
    if (bestEl) bestEl.textContent = best;

    var TRICKS = [
        { name: 'KICKFLIP', pts: 100, kind: 'flip' },
        { name: 'POP SHOVE-IT', pts: 120, kind: 'spin' },
        { name: 'HEELFLIP', pts: 110, kind: 'flip' },
        { name: '360 FLIP', pts: 180, kind: 'both' }
    ];
    var LABELS = ['NaN', 'OOM', '404', 'bug'];
    var G = 2300, OLLIE = -780, RAMP_POP = -950, TRICK_TIME = 0.42;

    var S; // state
    function reset() {
        S = {
            mode: 'idle', t: 0, speed: 250, dist: 0, score: 0,
            p: { x: 150, y: GROUND, vy: 0, airT: 0, air: false, grind: null, trick: null, tt: 0, squash: 0, ang: 0 },
            combo: 0, bank: 0, items: [], pops: [], nextSpawn: 500, trickIdx: 0, shake: 0, far: 0, mid: 0
        };
    }
    reset();

    function pop(text, color) { S.pops.push({ text: text, x: S.p.x, y: S.p.y - 80, t: 0, color: color || INK }); }

    function track(path, title) { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: path, title: title, event: true }); }
    var locked = false;
    window.SkateRun = { lock: function (b) { locked = !!b; } };
    function act() {
        if (locked) return;
        if (S.mode === 'idle') { S.mode = 'run'; track('game-start', 'Skate Run: started'); return; }
        if (S.mode === 'over') { if (S.t > 0.6) { reset(); S.mode = 'run'; track('game-retry', 'Skate Run: retry'); } return; }
        var p = S.p;
        if (!p.air) { // ollie (from ground or off a grind)
            p.vy = OLLIE; p.air = true; p.airT = 0;
            if (p.grind) { p.grind = null; }
        } else if (!p.trick) { // trick
            var tr = TRICKS[S.trickIdx % TRICKS.length]; S.trickIdx++;
            p.trick = tr; p.tt = 0;
        }
    }

    function land(onLedge) {
        var p = S.p;
        if (p.trick) { bail('landed mid-flip'); return; }
        p.vy = 0; p.air = false; p.squash = 0.12;
        if (onLedge) {
            p.grind = onLedge; p.y = onLedge.top;
            pop('50-50 GRIND', '#0b7a55');
        } else {
            p.y = GROUND;
            if (S.bank > 0) {
                var gain = S.bank * Math.max(1, S.combo);
                S.score += gain;
                pop((S.combo > 1 ? 'x' + S.combo + ' COMBO  ' : 'LANDED  ') + '+' + gain, '#C4467A');
            }
            S.bank = 0; S.combo = 0;
        }
    }

    function bail(why) {
        S.mode = 'over'; S.t = 0; S.shake = 0.35; S.why = why;
        S.bank = 0;
        var sc = Math.floor(S.score);
        if (sc > best) { best = sc; try { localStorage.setItem('skaterun2-best', best); } catch (e) {} }
        if (bestEl) bestEl.textContent = best;
        document.dispatchEvent(new CustomEvent('skate:over', { detail: { score: Math.floor(S.score) } }));
    }

    function spawn() {
        var r = Math.random(), x = W + 40;
        var level = Math.min(1, S.dist / 9000); // difficulty 0..1
        if (r < 0.26) {
            S.items.push({ type: 'cone', x: x, w: 26, h: 32 });
            S.nextSpawn = 380 + Math.random() * 260 - level * 80;
        } else if (r < 0.46) {
            S.items.push({ type: 'bug', x: x, w: 50, h: 40, label: LABELS[Math.floor(Math.random() * LABELS.length)] });
            S.nextSpawn = 420 + Math.random() * 260 - level * 80;
        } else if (r < 0.68) {
            var lw = 240 + Math.random() * 180;
            S.items.push({ type: 'ledge', x: x, w: lw, h: 44, top: GROUND - 44 });
            for (var i = 0; i < 4; i++) S.items.push({ type: 'coin', x: x + 40 + i * (lw - 80) / 3, y: GROUND - 90, got: false });
            S.nextSpawn = lw + 300 + Math.random() * 200;
        } else if (r < 0.84) {
            S.items.push({ type: 'ramp', x: x, w: 90, h: 42 });
            for (var j = 0; j < 5; j++) S.items.push({ type: 'coin', x: x + 170 + j * 55, y: GROUND - 150 - Math.sin(j / 4 * Math.PI) * 70, got: false });
            S.nextSpawn = 720 + Math.random() * 200;
        } else {
            for (var k = 0; k < 5; k++) S.items.push({ type: 'coin', x: x + k * 46, y: GROUND - 40 - Math.sin(k / 4 * Math.PI) * 60, got: false });
            S.nextSpawn = 380 + Math.random() * 200;
        }
    }

    function update(dt) {
        S.t += dt;
        if (S.shake > 0) S.shake -= dt;
        S.pops.forEach(function (o) { o.t += dt; o.y -= 40 * dt; });
        S.pops = S.pops.filter(function (o) { return o.t < 1.1; });
        if (S.mode !== 'run') return;

        S.speed = Math.min(520, 250 + S.t * 4.5);
        var dx = S.speed * dt;
        S.dist += dx; S.far += dx * 0.15; S.mid += dx * 0.4;
        S.score += dx / 12;
        S.nextSpawn -= dx;
        if (S.nextSpawn <= 0) spawn();

        var p = S.p;
        if (p.squash > 0) p.squash -= dt;

        // trick animation
        if (p.trick) {
            p.tt += dt;
            if (p.tt >= TRICK_TIME) {
                S.bank += p.trick.pts; S.combo++;
                pop(p.trick.name + ' +' + p.trick.pts, '#C4467A');
                p.trick = null; p.tt = 0;
            }
        }

        // physics
        if (p.air) {
            p.airT += dt;
            var prevY = p.y;
            p.vy += G * dt; p.y += p.vy * dt;
            if (p.vy > 0) {
                for (var i = 0; i < S.items.length; i++) {
                    var it = S.items[i];
                    if (it.type === 'ledge' && p.x > it.x + 6 && p.x < it.x + it.w - 6 && prevY <= it.top + 2 && p.y >= it.top) {
                        land(it); if (S.mode !== 'run') return; break;
                    }
                }
            }
            if (p.air && p.y >= GROUND) { land(null); if (S.mode !== 'run') return; }
        } else if (p.grind) {
            S.bank += 60 * dt; S.score += 0;
            if (p.x > p.grind.x + p.grind.w) { p.grind = null; p.air = true; p.vy = -120; p.airT = 1; S.combo++; }
        }

        // world items
        for (var n = S.items.length - 1; n >= 0; n--) {
            var o = S.items[n];
            o.x -= dx;
            if (o.x + (o.w || 20) < -60) { S.items.splice(n, 1); continue; }
            var px1 = p.x - 13, px2 = p.x + 13, ptop = p.y - 52, pbot = p.y;
            if (o.type === 'coin' && !o.got && Math.abs(o.x - p.x) < 22 && Math.abs(o.y - (p.y - 28)) < 34) {
                o.got = true; S.score += 25; pop('+25', '#0b7a55');
            } else if ((o.type === 'cone' || o.type === 'bug') && px2 > o.x + 5 && px1 < o.x + o.w - 5 && pbot > GROUND - o.h + 4) {
                bail('hit ' + (o.type === 'cone' ? 'a cone' : 'a ' + o.label)); return;
            } else if (o.type === 'ledge' && !p.grind && px2 > o.x + 4 && px1 < o.x + o.w && pbot > o.top + 8 && ptop < GROUND) {
                bail('ate the ledge'); return;
            } else if (o.type === 'ramp' && !p.air && p.x > o.x + o.w * 0.55 && p.x < o.x + o.w) {
                p.air = true; p.vy = RAMP_POP; p.airT = 0; S.combo++; pop('BIG AIR', '#2a6fdb');
            }
        }
        if (scoreEl) scoreEl.textContent = Math.floor(S.score);
    }

    // ---------- drawing ----------
    function rr(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }

    var skyline = []; for (var b = 0; b < 30; b++) skyline.push({ w: 40 + Math.random() * 60, h: 40 + Math.random() * 110 });
    function drawBg() {
        var g = ctx.createLinearGradient(0, 0, 0, GROUND);
        g.addColorStop(0, '#CFE6FB'); g.addColorStop(1, '#FFE9F1');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = BUTTER; ctx.beginPath(); ctx.arc(760, 70, 34, 0, 7); ctx.fill();
        // far skyline
        var x = -(S.far % 1600);
        ctx.fillStyle = 'rgba(142,200,255,.55)';
        for (var r = 0; r < 2; r++) for (var i = 0; i < skyline.length; i++) {
            var s = skyline[i]; ctx.fillRect(x, GROUND - s.h, s.w - 6, s.h); x += s.w;
        }
        // mid palms / posts
        ctx.strokeStyle = 'rgba(31,37,64,.25)'; ctx.lineWidth = 3;
        for (var k = 0; k < 6; k++) {
            var mx = ((k * 190 - S.mid) % 1140 + 1140) % 1140 - 60;
            ctx.beginPath(); ctx.moveTo(mx, GROUND); ctx.lineTo(mx + 6, GROUND - 90); ctx.stroke();
            ctx.fillStyle = 'rgba(139,227,190,.7)'; ctx.beginPath(); ctx.ellipse(mx + 6, GROUND - 92, 26, 10, -0.3, 0, 7); ctx.fill();
        }
        // ground
        ctx.fillStyle = '#FADCE6'; ctx.fillRect(0, GROUND, W, H - GROUND);
        ctx.fillStyle = INK; ctx.fillRect(0, GROUND, W, 3);
        ctx.fillStyle = 'rgba(31,37,64,.35)';
        var off = S.dist % 80;
        for (var d = -off; d < W; d += 80) ctx.fillRect(d, GROUND + 22, 40, 3);
    }

    function drawItem(o) {
        ctx.lineWidth = 2.5; ctx.strokeStyle = INK;
        if (o.type === 'cone') {
            ctx.fillStyle = '#FF9F5A'; ctx.beginPath(); ctx.moveTo(o.x, GROUND); ctx.lineTo(o.x + o.w / 2, GROUND - o.h); ctx.lineTo(o.x + o.w, GROUND); ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.fillStyle = '#fff'; ctx.fillRect(o.x + 7, GROUND - 16, o.w - 14, 5);
        } else if (o.type === 'bug') {
            ctx.fillStyle = PINK; rr(o.x, GROUND - o.h, o.w, o.h, 9); ctx.fill(); ctx.stroke();
            ctx.fillStyle = INK; ctx.font = '700 13px "JetBrains Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(o.label, o.x + o.w / 2, GROUND - o.h / 2 + 5);
        } else if (o.type === 'ledge') {
            ctx.fillStyle = SKY; rr(o.x, o.top, o.w, o.h, 6); ctx.fill(); ctx.stroke();
            ctx.fillStyle = '#B8BFCC'; ctx.fillRect(o.x, o.top - 4, o.w, 5); ctx.strokeRect(o.x, o.top - 4, o.w, 5);
        } else if (o.type === 'ramp') {
            ctx.fillStyle = MINT; ctx.beginPath(); ctx.moveTo(o.x, GROUND); ctx.quadraticCurveTo(o.x + o.w * 0.75, GROUND, o.x + o.w, GROUND - o.h); ctx.lineTo(o.x + o.w, GROUND); ctx.closePath(); ctx.fill(); ctx.stroke();
        } else if (o.type === 'coin' && !o.got) {
            ctx.fillStyle = BUTTER; ctx.beginPath(); ctx.arc(o.x, o.y, 9, 0, 7); ctx.fill(); ctx.stroke();
            ctx.fillStyle = INK; ctx.font = '700 11px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('✦', o.x, o.y + 4);
        }
    }

    // ollie pitch: tail snaps, nose leads, front foot levels it, slight nose-down into landing
    function pitch(p) {
        if (!p.air || S.mode === 'over') return 0;
        var t = p.airT, e;
        if (t < 0.08) { e = t / 0.08; return -0.52 * (1 - (1 - e) * (1 - e)); }
        if (t < 0.30) { e = (t - 0.08) / 0.22; return -0.52 * (1 - e * e * (3 - 2 * e)); }
        if (p.vy > 0) return Math.min(0.1, p.vy / 9000);
        return 0;
    }
    var TX = -22, TY = -3; // tail pivot (rear end of the deck)
    function onBoard(x, y, a) { var dx = x - TX, dy = y - TY, c = Math.cos(a), s = Math.sin(a); return [TX + dx * c - dy * s, TY + dx * s + dy * c]; }

    function drawSkater() {
        var p = S.p, over = S.mode === 'over';
        ctx.save(); ctx.translate(p.x, p.y);
        var crouch = (p.squash > 0 ? 6 : 0) + (p.air && p.vy < 0 ? 4 : 0);
        if (over) { ctx.rotate(Math.min(1.4, S.t * 5)); }
        // board
        var prog = p.trick ? p.tt / TRICK_TIME : 0, kind = p.trick ? p.trick.kind : '';
        var pa = pitch(p);
        ctx.save(); ctx.translate(TX, TY); ctx.rotate(pa); ctx.translate(-TX, -TY);
        ctx.translate(0, -6 - (p.trick ? 14 * Math.sin(prog * Math.PI) : 0));
        if (kind === 'spin' || kind === 'both') ctx.scale(Math.cos(prog * Math.PI * 2), 1);
        if (kind === 'flip' || kind === 'both') ctx.scale(1, Math.max(0.15, Math.abs(Math.cos(prog * Math.PI * 2))));
        ctx.fillStyle = (kind && Math.cos(prog * Math.PI * 2) < 0) ? PINK : INK;
        rr(-24, -3, 48, 6, 3); ctx.fill();
        ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(-15, 5, 4, 0, 7); ctx.arc(15, 5, 4, 0, 7); ctx.fill();
        ctx.restore();
        // body
        ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.lineCap = 'round';
        var hip = -26 + crouch;
        var lift = p.trick ? -10 * Math.sin(prog * Math.PI) : 0;
        var rf = onBoard(-10, -10 + lift, pa), ff = onBoard(10, -10 + lift, pa); // feet ride the deck
        ctx.beginPath(); ctx.moveTo(rf[0], rf[1]); ctx.lineTo(-4, hip); ctx.lineTo(ff[0], ff[1]); ctx.stroke(); // legs
        ctx.strokeStyle = SKY; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-3, hip); ctx.lineTo(2, hip - 20); ctx.stroke(); // hoodie
        ctx.strokeStyle = INK; ctx.lineWidth = 3.5;
        var arm = p.air ? -14 : -4;
        ctx.beginPath(); ctx.moveTo(1, hip - 16); ctx.lineTo(-16, hip - 12 + arm); ctx.moveTo(1, hip - 16); ctx.lineTo(18, hip - 8 + arm); ctx.stroke();
        ctx.fillStyle = '#C98A5B'; ctx.beginPath(); ctx.arc(4, hip - 30, 9, 0, 7); ctx.fill(); ctx.lineWidth = 2.5; ctx.stroke();
        ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(4, hip - 34, 10, Math.PI * 1.05, Math.PI * 2.1); ctx.fill(); // curly hair
        for (var h = 0; h < 4; h++) { ctx.beginPath(); ctx.arc(-3 + h * 5, hip - 40, 3.2, 0, 7); ctx.fill(); }
        ctx.strokeStyle = INK; ctx.lineWidth = 1.6; ctx.strokeRect(5, hip - 32, 5, 3.5); // glasses
        ctx.restore();
    }

    function drawHud() {
        ctx.textAlign = 'left'; ctx.fillStyle = INK; ctx.font = '800 18px "Bricolage Grotesque", sans-serif';
        ctx.fillText(Math.floor(S.score).toString(), 16, 30);
        if (S.combo > 0 && S.mode === 'run') {
            ctx.fillStyle = PINK; rr(14, 40, 110, 24, 12); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.stroke();
            ctx.fillStyle = INK; ctx.font = '700 12px "JetBrains Mono", monospace';
            ctx.fillText('x' + S.combo + '  +' + Math.floor(S.bank), 24, 57);
        }
        S.pops.forEach(function (o) {
            ctx.globalAlpha = Math.max(0, 1 - o.t / 1.1); ctx.fillStyle = o.color; ctx.textAlign = 'center';
            ctx.font = '800 16px "Bricolage Grotesque", sans-serif'; ctx.fillText(o.text, o.x + 40, o.y); ctx.globalAlpha = 1;
        });
    }

    function panel(title, lines) {
        ctx.fillStyle = 'rgba(255,255,255,.92)'; rr(W / 2 - 250, 50, 500, 52 + lines.length * 24, 18); ctx.fill();
        ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke();
        ctx.textAlign = 'center'; ctx.fillStyle = INK; ctx.font = '800 26px "Bricolage Grotesque", sans-serif';
        ctx.fillText(title, W / 2, 86);
        ctx.font = '500 14px "JetBrains Mono", monospace';
        lines.forEach(function (l, i) { ctx.fillText(l, W / 2, 114 + i * 24); });
    }

    function draw() {
        ctx.save();
        if (S.shake > 0) ctx.translate((Math.random() - .5) * 10, (Math.random() - .5) * 6);
        drawBg();
        S.items.forEach(drawItem);
        drawSkater();
        drawHud();
        ctx.restore();
        if (S.mode === 'idle') panel('SKATE RUN', ['space / tap = ollie', 'tap again in the air = flip trick', 'land on ledges to grind, hit ramps for big air', "don't land mid-flip. press to start"]);
        if (S.mode === 'over') panel('BAILED: ' + S.why, ['score ' + Math.floor(S.score) + '   ·   best ' + best, 'space / tap to skate again']);
    }

    var last = 0, inView = false, visible = true;
    function frame(ts) {
        var dt = last ? Math.min(0.05, (ts - last) / 1000) : 0; last = ts;
        if (inView && visible) update(dt);
        draw();
        requestAnimationFrame(frame);
    }
    document.addEventListener('visibilitychange', function () { visible = !document.hidden; last = 0; });
    document.addEventListener('keydown', function (e) {
        if (!inView) return;
        var tg = e.target && e.target.tagName;
        if (tg === 'INPUT' || tg === 'TEXTAREA' || tg === 'BUTTON') return;
        if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') { e.preventDefault(); if (!e.repeat) act(); }
    });
    c.addEventListener('pointerdown', function (e) { e.preventDefault(); act(); });
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) { inView = en[0].isIntersecting; last = 0; }, { threshold: 0.35 }).observe(c);
    } else inView = true;
    requestAnimationFrame(frame);
})();
