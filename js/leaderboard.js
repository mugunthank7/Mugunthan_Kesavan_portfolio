/* Skate Run leaderboard (Supabase REST, opt-in).
   Fill in SUPABASE_URL and SUPABASE_ANON_KEY below. The anon key is meant to be public;
   row-level security in the database only allows reading and inserting valid scores. */
(function () {
    var SUPABASE_URL = 'https://ajnqygkwhcahuocwkurh.supabase.co';
    var SUPABASE_ANON_KEY = 'sb_publishable_E9VZG-aGkZPNzbWTddNJSQ_HpL76M-Y';
    var TOP = 10, MIN_SCORE = 100;

    var board = document.querySelector('.leaderboard');
    var form = document.querySelector('.lb-form');
    if (!board || !form) return;
    if (SUPABASE_URL.indexOf('http') !== 0 || SUPABASE_ANON_KEY.indexOf('_HERE') > -1) return; // not configured: stay hidden

    var API = SUPABASE_URL.replace(/\/$/, '') + '/rest/v1/scores';
    var HEADERS = { apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json' };
    // legacy anon keys are JWTs and also go in Authorization; new sb_publishable_ keys only use the apikey header
    if (SUPABASE_ANON_KEY.indexOf('eyJ') === 0) HEADERS.Authorization = 'Bearer ' + SUPABASE_ANON_KEY;
    var list = board.querySelector('.lb-list');
    var rows = [], lastScore = 0, mine = null;

    function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
    function esc(t) { var d = document.createElement('span'); d.textContent = t; return d.innerHTML; }
    function track(path, title) { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: path, title: title, event: true }); }

    function render() {
        if (!rows.length) { list.innerHTML = '<li class="lb-empty">No scores yet. Be the first.</li>'; return; }
        list.innerHTML = rows.map(function (r, i) {
            var me = mine && r.id === mine ? ' class="me"' : '';
            return '<li' + me + '><span class="lb-rank">' + (i + 1) + '</span><span class="lb-who"><b>' + esc(r.name) + '</b>' +
                (r.org ? '<small>' + esc(r.org) + '</small>' : '') + '</span><span class="lb-score">' + r.score.toLocaleString() + '</span></li>';
        }).join('');
    }

    function load() {
        return fetch(API + '?select=id,name,org,score&order=score.desc,created_at.asc&limit=' + TOP, { headers: HEADERS })
            .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
            .then(function (d) { rows = d; render(); board.hidden = false; })
            .catch(function () { list.innerHTML = '<li class="lb-empty">Leaderboard is offline right now.</li>'; board.hidden = false; });
    }

    function qualifies(score) {
        if (score < MIN_SCORE) return false;
        return rows.length < TOP || score > rows[rows.length - 1].score;
    }

    function close() { form.hidden = true; if (window.SkateRun) window.SkateRun.lock(false); }

    document.addEventListener('skate:over', function (e) {
        lastScore = e.detail.score;
        if (!qualifies(lastScore)) return;
        form.querySelector('.lb-form-score').textContent = lastScore.toLocaleString();
        form.elements['name'].value = store('lb-name') || '';
        form.elements['org'].value = store('lb-org') || '';
        form.querySelector('.lb-form-msg').textContent = '';
        form.hidden = false;
        if (window.SkateRun) window.SkateRun.lock(true);
        setTimeout(function () { form.elements['name'].focus(); }, 50);
    });

    form.querySelector('.lb-skip').addEventListener('click', close);
    form.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = form.elements['name'].value.trim().slice(0, 24), org = form.elements['org'].value.trim().slice(0, 40);
        var msg = form.querySelector('.lb-form-msg'), btn = form.querySelector('button[type=submit]');
        if (!name) { msg.textContent = 'Add a name first.'; return; }
        store('lb-name', name); store('lb-org', org);
        btn.disabled = true; msg.textContent = 'Saving…';
        fetch(API, {
            method: 'POST',
            headers: Object.assign({ Prefer: 'return=representation' }, HEADERS),
            body: JSON.stringify({ name: name, org: org || null, score: lastScore })
        }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
          .then(function (d) { mine = d && d[0] && d[0].id; track('leaderboard-submit', 'Leaderboard: score submitted'); close(); return load(); })
          .catch(function () { msg.textContent = "Couldn't save. Try again in a bit."; })
          .then(function () { btn.disabled = false; });
    });

    load();
})();
