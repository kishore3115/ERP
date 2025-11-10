// Simple hash-based SPA for ERP modules with a mock login flow
const modules = [
  'Home','Academic','Registration','Attendance register','Career Choice','Courses','Counselling','Diary','Clubs/Activities','Exam Section','Feedback','Fee Payments','Hostel Management','Hallticket','Infrastructure Related','Library','My CGPA','Nodue','Profile','Psychometric Tests','Quizzes','Registrar Office','My Transportation','Ticketing','Support','Time Tables'
].map((title)=>({
  title,
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''),
  content: `<p>This is a placeholder for the <strong>${title}</strong> module. Replace with real UI and data.</p>`
}));

const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');
const loginPage = document.getElementById('login-page');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const userArea = document.getElementById('user-area');
const userNameEl = document.getElementById('user-name');

function renderSidebar(filter=''){
  const list = document.createElement('ul');
  list.className = 'menu';
  const f = filter.trim().toLowerCase();
  modules.forEach(m=>{
    if(f && !m.title.toLowerCase().includes(f)) return;
    const a = document.createElement('a');
    a.href = `#${m.slug}`;
    a.className = 'menu-item';
    a.textContent = m.title;
    if(location.hash.replace('#','')===m.slug) a.classList.add('active');
    list.appendChild(a);
  });
  sidebar.innerHTML = '';
  sidebar.appendChild(list);
}

function renderModuleBySlug(slug){
  const mod = modules.find(m=>m.slug===slug) || modules[0];
  document.title = `ERP — ${mod.title}`;
  const header = document.createElement('div');
  header.className = 'module-header';
  const h = document.createElement('h2');
  // Use custom header text for some modules
  if(mod.slug === 'home') h.textContent = 'Welcome';
  else if(mod.slug === 'registration') h.textContent = 'Report Status';
  else h.textContent = mod.title;
  header.appendChild(h);

  // No global search input — nothing to toggle here.

  const contentCard = document.createElement('div');
  contentCard.className = 'card';
  // For Home we render the custom dashboard cards (in extras), so skip the generic placeholder
  if(mod.slug === 'home'){
    contentCard.innerHTML = '';
  } else if(mod.slug === 'registration'){
    // Show report status and a short message for Registration
    contentCard.innerHTML = `<h3>Report Status</h3><p>Registration Process is closed</p>`;
  } else if(mod.slug === 'attendance-register'){
    // Attendance will render its UI in extras; avoid the generic placeholder
    contentCard.innerHTML = '';
  } else {
    contentCard.innerHTML = mod.content;
  }

  const extras = renderExtrasFor(mod.slug);

  main.innerHTML = '';
  main.appendChild(header);
  main.appendChild(contentCard);
  if(extras) main.appendChild(extras);

  // update active class in sidebar
  document.querySelectorAll('.menu-item').forEach(el=>{
    el.classList.toggle('active', el.getAttribute('href')===`#${mod.slug}`);
  });
}

function renderExtrasFor(slug){
  // Provide a couple of small interactive placeholders for a few modules
  if(slug==='attendance-register' || slug==='attendance-register'.replace(/[^a-z0-9-]/g,'')){
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="attendance-form">
        <div class="form-row">
          <label>Academic year</label>
          <select id="attendance-year">
            <option value="">Select Academic Year</option>
            <option>2025-26</option>
            <option>2024-25</option>
            <option>2023-24</option>
          </select>
        </div>
        <div class="form-row">
          <label>Semester id</label>
          <select id="attendance-semester">
            <option value="">Select Semester</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
        <div class="form-actions">
          <button id="attendance-search" class="btn primary">Search</button>
          <button id="attendance-reset" type="button" class="btn">Reset</button>
        </div>
      </div>
      <div id="attendance-results" style="margin-top:12px;display:none"></div>
    `;

    // attach handlers after element is in DOM (caller will append this node)
    // but we can attach handlers to the node's children safely here using querySelector on card
    const bindHandlers = ()=>{
      const year = card.querySelector('#attendance-year');
      const sem = card.querySelector('#attendance-semester');
      const searchBtn = card.querySelector('#attendance-search');
      const resetBtn = card.querySelector('#attendance-reset');
      const results = card.querySelector('#attendance-results');

      const renderTable = ()=>{
        results.innerHTML = `
          <table class="table">
            <thead><tr><th>Student</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>Alice</td><td>2025-11-01</td><td>Present</td></tr>
              <tr><td>Bob</td><td>2025-11-01</td><td>Absent</td></tr>
            </tbody>
          </table>
        `;
        results.style.display = 'block';
      };

      searchBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        if(!year.value || !sem.value){
          alert('Please select academic year and semester');
          return;
        }
        renderTable();
      });

      resetBtn.addEventListener('click', ()=>{
        year.value = '';
        sem.value = '';
        results.innerHTML = '';
        results.style.display = 'none';
      });
    };

    // Use a short timeout to ensure the caller appended the card before binding (safe in this SPA)
    setTimeout(bindHandlers, 0);

    return card;
  }
  if(slug==='courses'){
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML = `<h3>Available courses</h3><div class="grid"><div class="card">Mathematics</div><div class="card">Physics</div><div class="card">Programming 101</div><div class="card">English</div></div>`;
    return card;
  }
  if(slug==='home'){
    // Home dashboard: a 2x2 grid of quick-link cards
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>Welcome to the ERP Portal</h3>
      <p>Access your academic and administrative modules from here.</p>
      <div class="home-grid">
        <div class="home-card">
          <div class="home-left">
            <div class="home-icon">📄</div>
            <div class="home-title">Journals &amp; Conferences</div>
          </div>
          <div class="home-badge">0</div>
        </div>
        <div class="home-card">
          <div class="home-left">
            <div class="home-icon">🏆</div>
            <div class="home-title">Awards &amp; Recognitions</div>
          </div>
          <div class="home-badge">0</div>
        </div>
        <div class="home-card">
          <div class="home-left">
            <div class="home-icon">👥</div>
            <div class="home-title">Workshops, Seminars &amp; Guest Lectures</div>
          </div>
          <div class="home-badge">0</div>
        </div>
        <div class="home-card">
          <div class="home-left">
            <div class="home-icon">🧩</div>
            <div class="home-title">Projects &amp; Consultancy</div>
          </div>
          <div class="home-badge">0</div>
        </div>
      </div>
    `;
    return card;
  }
  return null;
}

// Initialize
// --- Auth helpers ---
function isLoggedIn(){
  return !!localStorage.getItem('erp_user');
}

function setLoggedIn(username){
  localStorage.setItem('erp_user', username);
}

function logout(){
  localStorage.removeItem('erp_user');
  updateAuthUI();
}

function updateAuthUI(){
  const logged = isLoggedIn();
  if(logged){
    loginPage.setAttribute('aria-hidden','true');
    loginPage.classList.add('hidden');
    userArea.style.display = 'inline-flex';
    userNameEl.textContent = localStorage.getItem('erp_user');
    document.querySelector('footer').classList.remove('hidden');
    // show topbar and app
    document.querySelector('.topbar').classList.remove('hidden');
    document.querySelector('.app').classList.remove('hidden');
    renderSidebar();
    // ensure we have a hash
    if(!location.hash) location.hash = `#${modules[0].slug}`;
    handleHash();
  } else {
    loginPage.setAttribute('aria-hidden','false');
    loginPage.classList.remove('hidden');
    userArea.style.display = 'none';
    // hide whole app, footer and topbar while on login page (removes search)
    document.querySelector('.app').classList.add('hidden');
    document.querySelector('footer').classList.add('hidden');
    document.querySelector('.topbar').classList.add('hidden');
  }
}

// --- Router ---
function handleHash(){
  if(!isLoggedIn()) return; // guard: don't change page when logged out
  const slug = location.hash.replace('#','') || 'home';
  renderModuleBySlug(slug);
}

window.addEventListener('hashchange', handleHash);

window.addEventListener('load', ()=>{
  updateAuthUI();
});

// Accessibility: let main area be focusable via keyboard
main.addEventListener('keydown', (e)=>{
  if(e.key==='/' && document.activeElement!==searchInput){
    e.preventDefault();searchInput.focus();
  }
});

// --- Login form handling ---
loginForm.addEventListener('submit', (ev)=>{
  ev.preventDefault();
  const u = (document.getElementById('username').value || '').trim();
  const p = (document.getElementById('password').value || '').trim();
  if(!u || !p){
    alert('Please enter username and password');
    return;
  }
  // Mock auth: accept any non-empty credentials
  setLoggedIn(u);
  updateAuthUI();
});

logoutBtn.addEventListener('click', ()=>{
  logout();
});
