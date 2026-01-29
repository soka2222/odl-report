
(function(){
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  if(stored){ root.setAttribute('data-theme', stored); }

  function setTheme(next){
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }
  window.__toggleTheme = function(){
    const cur = root.getAttribute('data-theme') || 'dark';
    setTheme(cur === 'dark' ? 'light' : 'dark');
  };

  // Active nav highlight
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a[data-file]').forEach(a=>{
    if(a.getAttribute('data-file') === path){
      a.classList.add('active');
    }
  });

  // Build per-page TOC from h2/h3
  const tocMount = document.querySelector('[data-toc]');
  if(tocMount){
    const headers = Array.from(document.querySelectorAll('main h2, main h3'))
      .filter(h=>h.textContent.trim().length>0)
      .slice(0, 20);
    if(headers.length){
      const wrap = document.createElement('div');
      wrap.className = 'toc';
      wrap.innerHTML = '<div class="title">On this page</div>';
      headers.forEach(h=>{
        const id = h.id || h.textContent.trim().toLowerCase()
          .replace(/[^a-z0-9\s-]/g,'')
          .replace(/\s+/g,'-')
          .slice(0,60);
        h.id = id;
        const a = document.createElement('a');
        a.href = '#' + id;
        a.innerHTML = (h.tagName==='H3' ? '&nbsp;&nbsp;↳ ' : '') + h.textContent;
        wrap.appendChild(a);
      });
      tocMount.appendChild(wrap);
    }
  }

  // Mobile drawer
  const drawer = document.querySelector('#drawer');
  window.__openDrawer = function(){
    if(!drawer) return;
    drawer.style.display = 'block';
  };
  window.__closeDrawer = function(){
    if(!drawer) return;
    drawer.style.display = 'none';
  };
  if(drawer){
    drawer.addEventListener('click', (e)=>{
      if(e.target === drawer) window.__closeDrawer();
    });
  }
})();
