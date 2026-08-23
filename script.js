const menu=document.querySelector(".menu"), nav=document.querySelector(".nav nav");
menu?.addEventListener("click",()=>nav.classList.toggle("open"));
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
function demoLink(e){e.preventDefault();alert("This is a placeholder link. Add your real course, class, resource, payment or WhatsApp URL in index.html.");return false;}
