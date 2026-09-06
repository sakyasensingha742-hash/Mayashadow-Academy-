/* ============================================================
   MAYA SHADOW ACADEMY
   MULTI-COURSE CONTINUE LEARNING
   ============================================================ */
(function(){
  function getProgress(course){
    let total = 0;
    (course.modules || []).forEach(function(module){
      total += (module.classes || module.lessons || []).length;
    });
    if(!total) return { percent: 0, completed: 0, total: 0 };

    let completed = [];
    try{
      const saved = localStorage.getItem("maya_shadow_progress_" + course.id);
      if(saved) completed = JSON.parse(saved);
    }catch(e){ completed = []; }
    if(!Array.isArray(completed)) completed = [];

    const validCompleted = completed.filter(function(id){
      return typeof id === "string" || typeof id === "number";
    });

    return {
      percent: Math.min(100, Math.round((validCompleted.length / total) * 100)),
      completed: validCompleted.length,
      total: total
    };
  }

  function render(){
    const academy = window.MayaShadowAcademy;
    const section = document.querySelector(".section");
    if(!academy || !academy.courses || !section) return false;

    const heading = Array.from(section.querySelectorAll("h2")).find(function(el){
      return el.textContent.indexOf("Continue Learning") !== -1;
    });
    if(!heading) return false;

    const continueSection = heading.closest("section");
    if(!continueSection) return false;

    const courses = academy.courses.map(function(course){
      return { course: course, progress: getProgress(course) };
    }).filter(function(item){
      return item.progress.total > 0;
    });

    courses.sort(function(a,b){
      if(b.progress.percent !== a.progress.percent) return b.progress.percent - a.progress.percent;
      return academy.courses.indexOf(a.course) - academy.courses.indexOf(b.course);
    });

    let active = courses.filter(function(item){ return item.progress.percent < 100 && item.progress.percent > 0; });
    let recommended = courses.filter(function(item){ return item.progress.percent === 0; });

    let selected = active.concat(recommended).slice(0, 3);
    if(!selected.length) selected = courses.slice(0, 3);

    const cards = selected.map(function(item){
      const course = item.course;
      const p = item.progress;
      const label = p.percent > 0 ? "Continue Course" : "Start Course";
      const status = p.percent > 0 ? "In Progress" : "Recommended Course";
      return `
        <article class="continue-mini-card">
          <div class="continue-mini-icon">${course.icon || "🎓"}</div>
          <div class="continue-mini-content">
            <small>${status}</small>
            <h3>${course.title}</h3>
            <p>${course.description || "Professional learning program from Maya Shadow Academy."}</p>
            <div class="continue-mini-progress-label">
              <strong>${p.percent}% Complete</strong>
              <span>${p.completed}/${p.total} Classes</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${p.percent}%"></div></div>
          </div>
          <a class="continue-mini-btn" href="courses.html?course=${encodeURIComponent(course.id)}">${label} →</a>
        </article>`;
    }).join("");

    const oldCard = continueSection.querySelector(".continue-card");
    if(oldCard) oldCard.outerHTML = `<div class="continue-learning-grid">${cards}</div>`;

    return true;
  }

  const style = document.createElement("style");
  style.textContent = `
    .continue-learning-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
    .continue-mini-card{display:flex;flex-direction:column;gap:16px;padding:20px;border-radius:20px;border:1px solid rgba(40,169,240,.20);background:linear-gradient(145deg,rgba(40,169,240,.10),rgba(75,103,232,.06));min-width:0}
    .continue-mini-icon{height:110px;border-radius:15px;display:grid;place-items:center;background:linear-gradient(135deg,#132d49,#17254b);font-size:48px}
    .continue-mini-content small{color:var(--primary);font-weight:800;text-transform:uppercase;letter-spacing:1px;font-size:11px}
    .continue-mini-content h3{font-size:18px;line-height:1.35;margin:5px 0 7px}
    .continue-mini-content p{color:var(--muted);font-size:13px;line-height:1.5;min-height:58px}
    .continue-mini-progress-label{display:flex;justify-content:space-between;gap:8px;font-size:12px;margin-top:13px;margin-bottom:7px}
    .continue-mini-progress-label span{color:var(--muted)}
    .continue-mini-btn{display:block;text-align:center;padding:11px;border-radius:10px;background:linear-gradient(135deg,var(--primary),var(--primary2));font-weight:900;font-size:13px}
    @media(max-width:950px){.continue-learning-grid{grid-template-columns:1fr 1fr}}
    @media(max-width:700px){.continue-learning-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  function start(){
    if(render()) return;
    let tries = 0;
    const timer = setInterval(function(){
      tries++;
      if(render() || tries > 30) clearInterval(timer);
    }, 200);
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
