(()=>{"use strict";!function(){const t=document.querySelector(".add-project-button");let e=!1;function n(){const e=document.querySelector(".project-container"),n=document.querySelector(".project-form");e.removeChild(n),t.style.display="flex"}t.addEventListener("click",(()=>{t.style.display="none",document.querySelector(".project-container").appendChild(function(){const t=document.createElement("div");t.classList.add("project-form");const e=document.createElement("input");e.setAttribute("id","project-title-input"),e.placeholder="Project Title";const n=document.createElement("div");n.classList.add("project-form-button");const c=document.createElement("button");c.textContent="Add",c.classList.add("addButton");const o=document.createElement("button");return o.textContent="Cancel",o.classList.add("cancelButton"),n.appendChild(c),n.appendChild(o),t.appendChild(e),t.appendChild(n),t}()),e=!0,e&&document.querySelector(".cancelButton").addEventListener("click",n)}))}()})();