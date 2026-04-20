<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<title>Daily Challenge</title>

<!-- PWA -->
<link rel="manifest" href="manifest.json" />
<meta name="theme-color" content="#5B4FD9" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="Challenge" />
<link rel="apple-touch-icon" href="icons/icon-152x152.png" />

<!-- SEO / share -->
<meta name="description" content="Get an AI-powered daily challenge. Build your streak one day at a time." />
<meta property="og:title" content="Daily Challenge" />
<meta property="og:description" content="AI-powered daily challenges in Fitness, Money, Confidence & Mindset." />
<meta property="og:type" content="website" />

<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --purple:    #5B4FD9;
    --purple-dk: #3C3489;
    --purple-lt: #EEEDFE;
    --green:     #1D9E75;
    --green-lt:  #E1F5EE;
    --green-dk:  #0F6E56;
    --amber:     #BA7517;
    --amber-lt:  #FAEEDA;
    --amber-dk:  #854F0B;
    --teal:      #5DCAA5;
    --bg:        #F5F4FF;
    --card:      #FFFFFF;
    --text:      #1A1830;
    --muted:     #7B7A8E;
    --border:    rgba(91,79,217,0.15);
    --radius:    18px;
    --radius-sm: 12px;
  }

  html, body {
    height: 100%;
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
  }

  .phone-frame {
    max-width: 393px;
    min-height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    background: var(--bg);
    position: relative;
    overflow-x: hidden;
  }

  .header {
    background: var(--purple);
    padding: 52px 24px 40px;
    position: relative;
    overflow: hidden;
  }
  .header::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 200px; height: 200px;
    background: rgba(255,255,255,0.07);
    border-radius: 50%;
  }
  .header::after {
    content: '';
    position: absolute;
    bottom: -40px; left: -30px;
    width: 140px; height: 140px;
    background: rgba(255,255,255,0.05);
    border-radius: 50%;
  }
  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    position: relative; z-index: 1;
  }
  .app-title {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: #fff;
    line-height: 1.1;
  }
  .app-title span {
    display: block;
    font-size: 13px;
    font-weight: 400;
    color: rgba(255,255,255,0.65);
    font-family: 'DM Sans', sans-serif;
    margin-top: 4px;
  }
  .streak-badge {
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.25);
    border-radius: 30px;
    padding: 6px 14px;
    font-size: 13px;
    color: #fff;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .date-chip {
    background: rgba(255,255,255,0.12);
    border-radius: 30px;
    padding: 5px 14px;
    font-size: 12px;
    color: rgba(255,255,255,0.8);
    display: inline-block;
    position: relative; z-index: 1;
  }

  .install-banner {
    background: #fff;
    border-bottom: 1px solid var(--border);
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
    color: var(--text);
  }
  .install-banner button {
    margin-left: auto;
    background: var(--purple);
    color: #fff;
    border: none;
    border-radius: 30px;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
  }
  .install-banner .dismiss {
    background: none;
    color: var(--muted);
    padding: 6px;
    font-size: 16px;
  }

  .body { flex: 1; padding: 24px 16px 32px; }

  .section-label {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 12px;
  }

  .cat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 20px;
  }
  .cat-btn {
    padding: 14px 10px;
    border-radius: var(--radius-sm);
    border: 1.5px solid transparent;
    cursor: pointer;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    transition: transform 0.12s, box-shadow 0.12s;
    -webkit-tap-highlight-color: transparent;
  }
  .cat-btn:active { transform: scale(0.97); }
  .cat-btn.fitness    { background: var(--green-lt);  color: var(--green-dk);  border-color: #9FE1CB; }
  .cat-btn.money      { background: var(--amber-lt);  color: var(--amber-dk);  border-color: #FAC775; }
  .cat-btn.confidence { background: var(--purple-lt); color: var(--purple-dk); border-color: #CECBF6; }
  .cat-btn.mindset    { background: #E6F1FB;           color: #0C447C;          border-color: #B5D4F4; }
  .cat-btn.selected {
    border-width: 2px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.10);
    transform: translateY(-1px);
  }

  .generate-btn {
    width: 100%;
    padding: 17px;
    background: var(--purple);
    color: #fff;
    border: none;
    border-radius: var(--radius);
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    margin-bottom: 24px;
    transition: opacity 0.15s, transform 0.12s;
    letter-spacing: 0.01em;
    -webkit-tap-highlight-color: transparent;
  }
  .generate-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .generate-btn:not(:disabled):active { transform: scale(0.98); }
  .generate-btn:not(:disabled):hover { opacity: 0.92; }

  .challenge-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 22px 20px 18px;
    animation: fadeUp 0.3s ease;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .cat-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    font-weight: 600;
    font-family: 'Syne', sans-serif;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 20px;
    margin-bottom: 14px;
  }
  .challenge-text {
    font-size: 17px;
    line-height: 1.65;
    color: var(--text);
    margin-bottom: 20px;
    font-weight: 400;
  }
  .card-actions { display: flex; gap: 8px; }
  .action-btn {
    flex: 1;
    padding: 11px 8px;
    border-radius: var(--radius-sm);
    border: 1px solid rgba(0,0,0,0.08);
    background: #F8F7FF;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: var(--muted);
    transition: all 0.15s;
    -webkit-tap-highlight-color: transparent;
  }
  .action-btn:active { transform: scale(0.97); }
  .done-btn { background: var(--green-lt); color: var(--green-dk); border-color: #9FE1CB; }
  .done-btn.completed { background: var(--teal); color: #04342C; border-color: var(--teal); }

  .offline-notice {
    background: #FAEEDA;
    color: #854F0B;
    border-radius: var(--radius-sm);
    padding: 10px 14px;
    font-size: 13px;
    margin-bottom: 16px;
    display: none;
  }

  .empty-state {
    text-align: center;
    padding: 40px 0;
    color: var(--muted);
    font-size: 14px;
  }
  .empty-icon { font-size: 40px; margin-bottom: 10px; display: block; opacity: 0.6; }

  .spinner {
    display: inline-block;
    width: 15px; height: 15px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    vertical-align: middle;
    margin-right: 7px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .history-section { margin-top: 28px; }
  .history-list { display: flex; flex-direction: column; gap: 8px; }
  .history-item {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 12px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .history-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .history-info { flex: 1; min-width: 0; }
  .history-cat { font-size: 11px; font-weight: 600; font-family: 'Syne', sans-serif; color: var(--muted); letter-spacing: 0.05em; text-transform: uppercase; }
  .history-txt { font-size: 12px; color: var(--muted); margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style>
</head>
<body>

<div id="install-banner" class="install-banner" style="display:none">
  <span>📲</span>
  <span>Add to your home screen for the full app experience</span>
  <button id="install-btn">Install</button>
  <button class="dismiss" id="dismiss-install">✕</button>
</div>

<div class="phone-frame">
  <div class="header">
    <div class="header-top">
      <div class="app-title">
        Daily<br>Challenge
        <span id="date-label">Loading…</span>
      </div>
      <div class="streak-badge">🔥 <span id="streak-count">0</span> day streak</div>
    </div>
    <div class="date-chip">Pick a category &amp; rise to the challenge</div>
  </div>

  <div class="body">
    <div id="offline-notice" class="offline-notice">
      ⚠️ You're offline — new challenges need an internet connection.
    </div>

    <div class="section-label">Choose category</div>
    <div class="cat-grid">
      <button class="cat-btn fitness"    data-cat="Fitness">💪 Fitness</button>
      <button class="cat-btn money"      data-cat="Money">💰 Money</button>
      <button class="cat-btn confidence" data-cat="Confidence">⚡ Confidence</button>
      <button class="cat-btn mindset"    data-cat="Mindset">🧠 Mindset</button>
    </div>

    <button class="generate-btn" id="gen-btn" disabled>Choose a category first</button>

    <div id="challenge-area">
      <div class="empty-state">
        <span class="empty-icon">🎯</span>
        Your challenge will appear here
      </div>
    </div>

    <div class="history-section" id="history-section" style="display:none">
      <div class="section-label">Recent history</div>
      <div class="history-list" id="history-list"></div>
    </div>
  </div>
</div>

<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  if (!localStorage.getItem('dc_install_dismissed')) {
    document.getElementById('install-banner').style.display = 'flex';
  }
});
document.getElementById('install-btn').addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  document.getElementById('install-banner').style.display = 'none';
});
document.getElementById('dismiss-install').addEventListener('click', () => {
  document.getElementById('install-banner').style.display = 'none';
  localStorage.setItem('dc_install_dismissed', '1');
});

function updateOnlineStatus() {
  document.getElementById('offline-notice').style.display = navigator.onLine ? 'none' : 'block';
}
window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

const catStyles = {
  Fitness:    { badge: 'background:#E1F5EE;color:#0F6E56', dot: '#5DCAA5' },
  Money:      { badge: 'background:#FAEEDA;color:#854F0B', dot: '#EF9F27' },
  Confidence: { badge: 'background:#EEEDFE;color:#3C3489', dot: '#7F77DD' },
  Mindset:    { badge: 'background:#E6F1FB;color:#0C447C', dot: '#378ADD' },
};

function getData(key, fb) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fb; } catch { return fb; }
}
function setData(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

let selected       = null;
let streak         = getData('dc_streak', 0);
let lastDate       = getData('dc_last_date', '');
let completed      = getData('dc_completed', false);
let savedChallenge = getData('dc_challenge', '');
let savedCat       = getData('dc_cat', '');
let history        = getData('dc_history', []);

const today = new Date().toDateString();
if (lastDate !== today) completed = false;

document.getElementById('streak-count').textContent = streak;
document.getElementById('date-label').textContent = new Date().toLocaleDateString('en-US', {
  weekday: 'long', month: 'long', day: 'numeric'
});

document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selected = btn.dataset.cat;
    const g = document.getElementById('gen-btn');
    g.disabled = false;
    g.textContent = `Get today's ${selected.toLowerCase()} challenge`;
  });
});

if (savedChallenge && savedCat) {
  renderChallenge(savedChallenge, savedCat, completed);
  document.querySelectorAll('.cat-btn').forEach(b => {
    if (b.dataset.cat === savedCat) { b.classList.add('selected'); selected = savedCat; }
  });
  const g = document.getElementById('gen-btn');
  g.disabled = false;
  g.textContent = `Get a new ${savedCat.toLowerCase()} challenge`;
}
renderHistory();

document.getElementById('gen-btn').addEventListener('click', async () => {
  if (!selected) return;
  if (!navigator.onLine) { document.getElementById('offline-notice').style.display = 'block'; return; }

  const btn = document.getElementById('gen-btn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>Generating…';
  document.getElementById('challenge-area').innerHTML = '';

  try {
    // ✅ Calls our secure proxy — API key never touches the browser
    const res = await fetch('/api/challenge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: selected })
    });

    if (!res.ok) throw new Error(`Server error ${res.status}`);
    const data = await res.json();

    savedChallenge = data.challenge;
    savedCat = selected;
    completed = false;
    setData('dc_challenge', savedChallenge);
    setData('dc_cat', savedCat);
    setData('dc_completed', false);
    renderChallenge(savedChallenge, selected, false);
  } catch (err) {
    console.error(err);
    document.getElementById('challenge-area').innerHTML =
      '<div class="empty-state"><span class="empty-icon">⚠️</span>Could not load challenge. Try again!</div>';
  }

  btn.disabled = false;
  btn.textContent = `Get a new ${selected.toLowerCase()} challenge`;
});

function renderChallenge(text, cat, done) {
  const s = catStyles[cat] || catStyles.Fitness;
  document.getElementById('challenge-area').innerHTML = `
    <div class="challenge-card">
      <div class="cat-badge" style="${s.badge}">${cat}</div>
      <p class="challenge-text">${text}</p>
      <div class="card-actions">
        <button class="action-btn done-btn ${done ? 'completed' : ''}" id="done-btn">
          ${done ? '✓ Done!' : 'Mark as done'}
        </button>
        <button class="action-btn" id="reroll-btn">🎲 Re-roll</button>
      </div>
    </div>
  `;
  document.getElementById('done-btn').addEventListener('click', () => {
    if (completed) return;
    completed = true; streak++;
    setData('dc_streak', streak);
    setData('dc_completed', true);
    setData('dc_last_date', today);
    document.getElementById('streak-count').textContent = streak;
    const db = document.getElementById('done-btn');
    db.textContent = '✓ Done!';
    db.classList.add('completed');
    history.unshift({ cat, text: savedChallenge, date: today, done: true });
    if (history.length > 10) history = history.slice(0, 10);
    setData('dc_history', history);
    renderHistory();
  });
  document.getElementById('reroll-btn').addEventListener('click', () => {
    document.getElementById('gen-btn').click();
  });
}

function renderHistory() {
  if (!history.length) return;
  document.getElementById('history-section').style.display = 'block';
  document.getElementById('history-list').innerHTML = history.slice(0, 5).map(h => `
    <div class="history-item">
      <div class="history-dot" style="background:${catStyles[h.cat]?.dot || '#888'}"></div>
      <div class="history-info">
        <div class="history-cat">${h.cat}</div>
        <div class="history-txt">${h.text}</div>
      </div>
    </div>
  `).join('');
}
</script>
</body>
</html>
