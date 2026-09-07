/* Maya Shadow Academy — Site-wide professional UI enhancements */
(function(){
  "use strict";

  function ready(fn){
    if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(function(){
    /* Load the secure R2 uploader/file manager only on the admin asset-management page. */
    if(location.pathname.toLowerCase().indexOf("admin.html") > -1){
      var r2Script = document.createElement("script");
      r2Script.src = "admin-r2-upload.js?v=2";
      r2Script.defer = true;
      document.head.appendChild(r2Script);
    }

    /* Scroll progress */
    var progress = document.createElement("div");
    progress.id = "msa-scroll-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.appendChild(progress);

    function updateProgress(){
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      progress.style.width = (max > 0 ? (doc.scrollTop / max) * 100 : 0) + "%";
    }
    window.addEventListener("scroll", updateProgress, {passive:true});
    updateProgress();

    /* Back to top */
    var top = document.createElement("button");
    top.className = "msa-back-top";
    top.type = "button";
    top.textContent = "↑";
    top.setAttribute("aria-label", "Back to top");
    document.body.appendChild(top);
    top.addEventListener("click", function(){ window.scrollTo({top:0, behavior:"smooth"}); });
    window.addEventListener("scroll", function(){ top.classList.toggle("show", window.scrollY > 500); }, {passive:true});

    /* Small support/help button */
    var support = document.createElement("a");
    support.className = "msa-support";
    support.href = "https://api.whatsapp.com/send?phone=917908279118&text=Hello%20Maya%20Shadow%20Academy%2C%20I%20need%20help.";
    support.target = "_blank";
    support.rel = "noopener noreferrer";
    support.innerHTML = "<span>💬</span><b>Need Help?</b>";
    document.body.appendChild(support);

    /* Welcome popup — once per browser */
    if(!sessionStorage.getItem("msa_welcome_seen")){
      setTimeout(function(){
        var overlay = document.createElement("div");
        overlay.className = "msa-modal-overlay";
        overlay.innerHTML = ''+
          '<div class="msa-modal" role="dialog" aria-modal="true" aria-labelledby="msaWelcomeTitle">'+
            '<button class="msa-modal-close" aria-label="Close">×</button>'+ 
            '<div class="msa-modal-icon">✦</div>'+ 
            '<div class="msa-modal-kicker">WELCOME TO MAYA SHADOW ACADEMY</div>'+ 
            '<h2 id="msaWelcomeTitle">Learn. Create. Grow.</h2>'+ 
            '<p>Courses, Student Dashboard, Characters, Backgrounds, Props & Assets and learning resources — organized in one professional Academy.</p>'+ 
            '<div class="msa-modal-actions">'+
              '<a class="msa-modal-primary" href="academy.html">Open Academy Hub →</a>'+ 
              '<button class="msa-modal-secondary" type="button">Maybe Later</button>'+ 
            '</div>'+ 
          '</div>';
        document.body.appendChild(overlay);
        function close(){ overlay.classList.remove("open"); setTimeout(function(){overlay.remove();},220); sessionStorage.setItem("msa_welcome_seen","1"); }
        overlay.classList.add("open");
        overlay.querySelector(".msa-modal-close").addEventListener("click", close);
        overlay.querySelector(".msa-modal-secondary").addEventListener("click", close);
        overlay.addEventListener("click", function(e){ if(e.target === overlay) close(); });
        document.addEventListener("keydown", function esc(e){ if(e.key === "Escape"){ close(); document.removeEventListener("keydown", esc); } });
      }, 900);
    }

    /* Lightweight page-entry toast */
    var path = location.pathname.toLowerCase();
    var label = path.indexOf("dashboard") > -1 ? "Student Dashboard" :
      path.indexOf("courses") > -1 ? "Course Library" :
      path.indexOf("character-store") > -1 ? "Character Store" :
      path.indexOf("background-store") > -1 ? "Background Store" :
      path.indexOf("assets-store") > -1 ? "Props & Assets" :
      path.indexOf("resources") > -1 ? "Resources Center" :
      path.indexOf("academy") > -1 ? "Academy Hub" : "Maya Shadow Academy";
    var toast = document.createElement("div");
    toast.className = "msa-toast";
    toast.innerHTML = "<span>✦</span><div><strong>Welcome</strong><small>You're viewing " + label + "</small></div>";
    document.body.appendChild(toast);
    setTimeout(function(){toast.classList.add("show");}, 350);
    setTimeout(function(){toast.classList.remove("show");}, 4300);

    /* Smooth reveal for cards/sections */
    if("IntersectionObserver" in window){
      var observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){ entry.target.classList.add("msa-reveal-visible"); observer.unobserve(entry.target); }
        });
      }, {threshold:0.08});
      document.querySelectorAll("section, .card, .course-card, .quick-card, .future-card, .resource-list > a, .service-grid > div").forEach(function(el){
        el.classList.add("msa-reveal"); observer.observe(el);
      });
    }
  });
})();
