(()=>{"use strict";const t=[];class e{constructor(t){this.title=t}setProjectList(e){t.shift(e)}}const n=[];class i{constructor(t,e,n,i){this.title=t,this.description=e,this.date=n,this.priority=i}setTaskList(t,e,i,s){n.push({title:t,description:e,"due-date":i,priority:s}),console.log(n)}removeTaskList(t){n.splice(t,1),console.log(n)}updateTaskList(t,e,i,s,o){n[o].title=t,n[o].description=e,n[o].date=i,n[o].priority=s,console.log(n)}}!function(){document.querySelector("main");const t=document.querySelector(".task-list-container"),n=document.querySelector(".add-project-button"),s=document.querySelector(".project-container"),o=document.querySelector(".project-list"),a=document.querySelector(".add-task-button");let l=!1,d=!1,c=!1,r=!1;function u(){return document.getElementById("project-title-input")}function p(){if(""===u().value)return u().classList.add("invalid"),function(){const t=document.createElement("p");t.textContent="Project title cannot be empty",t.classList.add("error-message"),document.body.appendChild(t)}(),setTimeout(h,3e3),void u().addEventListener("input",(()=>{""===u().value?u().classList.add("invalid"):""!==u().value&&u().classList.remove("invalid")}));if(u().value.length>12)return function(){const t=document.createElement("p");t.textContent="Project title should not be more than 12 letters",t.classList.add("error-message"),document.body.appendChild(t)}(),setTimeout(h,3e3),u().addEventListener("input",(()=>{u().value.length<=12?u().classList.remove("invalid"):u().value.length>12&&u().classList.add("invalid")})),void u().classList.add("invalid");const t=document.createElement("button");t.classList.add("project-name");const n=document.createElement("div");n.classList.add("project-left-side");const i=document.createElement("span");i.innerHTML="<i class = 'fa-solid fa-tasks'></i>";const a=document.createElement("p");a.textContent=function(){const t=new e(u().value);return t.setProjectList(t.title),L(),t.title}();const l=document.createElement("div");l.classList.add("project-right-side"),l.innerHTML="<button class = 'delete-project-button'><i class = 'fa-solid fa-times'></i></button>",n.appendChild(i),n.appendChild(a),t.appendChild(n),t.appendChild(l),o.querySelector(".project-name")?o.insertBefore(t,o.firstChild):o.appendChild(t),s.appendChild(o)}function m(){const t=document.querySelectorAll(".form-element"),e=document.getElementById("task-title"),n=document.getElementById("task-description"),i=document.getElementById("task-date"),s=document.createElement("span"),o=document.createElement("span"),a=document.createElement("span");""===e.value&&(t.forEach((t=>{if(t.classList.contains("title")){if(t.querySelector(".invalid-message"))return;s.textContent="Task title is required",s.classList.add("invalid-message"),e.after(s),e.classList.add("invalid")}})),e.addEventListener("input",(()=>{""===e.value?(e.classList.add("invalid"),t.forEach((t=>{if(t.classList.contains("title")){if(t.querySelector(".invalid-message"))return;e.after(s)}}))):e.classList.contains("invalid")&&(e.removeAttribute("class"),t.forEach((t=>{t.classList.contains("title")&&t.removeChild(s)})))}))),""===n.value&&(t.forEach((t=>{if(t.classList.contains("description")){if(t.querySelector(".invalid-message"))return;o.textContent="Task description is required",o.classList.add("invalid-message"),n.after(o),n.classList.add("invalid")}})),n.addEventListener("input",(()=>{""===n.value?(n.classList.add("invalid"),t.forEach((t=>{if(t.classList.contains("description")){if(t.querySelector(".invalid-message"))return;n.after(o)}}))):n.classList.contains("invalid")&&(n.removeAttribute("class"),t.forEach((t=>{t.classList.contains("description")&&t.removeChild(o)})))}))),""===i.value&&(t.forEach((t=>{if(t.classList.contains("date")){if(t.querySelector(".invalid-message"))return;a.textContent="Due date is required",a.classList.add("invalid-message"),i.after(a),i.classList.add("invalid")}})),i.addEventListener("input",(()=>{""===i.value?(i.classList.add("invalid"),t.forEach((t=>{if(t.classList.contains("date")){if(t.querySelector(".invalid-message"))return;i.after(a)}}))):i.classList.contains("invalid")&&(i.removeAttribute("class"),t.forEach((t=>{t.classList.contains("date")&&t.removeChild(a)})))})))}function f(t,e){if(t.classList.contains("fa-pencil")){for(let n=0;n<e;n++)t=t.parentNode;return t}for(let n=0;n<e-1;n++)t=t.parentNode;return t}function v(){return{titleField:document.getElementById("task-title"),descriptionField:document.getElementById("task-description"),dateField:document.getElementById("task-date"),priorityField:document.getElementById("task-priority")}}function y(t){return{taskTitle:f(t.target,4).querySelector(".task-title"),secondTaskName:f(t.target,4).querySelector(".hidden-task-info .task-title"),taskDescription:f(t.target,4).querySelector(".task-description"),taskDate:f(t.target,4).querySelector(".task-date"),taskPriority:f(t.target,4).querySelector(".task-priority")}}function k(t){document.querySelector("main").appendChild(function(){const t=document.createElement("div");return t.classList.add("popup-field"),t.innerHTML='<form class="edit-form">\n    <fieldset>\n        <div class="column-one">\n            <div class="form-element title">\n                <label for="task-title">Title</label>\n                <input id="task-title" autocomplete = "off">\n            </div>\n\n            <div class="form-element description">\n                <label for="task-description">Description</label>\n                <textarea id="task-description"></textarea>\n            </div>\n        </div>\n\n        <div class="column-two">\n            <div class="form-element date">\n                <label for="task-date">Due Date</label>\n                <input id="task-date" type="date">\n            </div>\n\n            <div class="form-element priority">\n                <label for="task-priority">Priority</label>\n                <select id="task-priority">\n                    <option>Low</option>\n                    <option>Medium</option>\n                    <option>High</option>\n                </select>\n            </div>\n        </div>\n\n    </fieldset>\n    <div class="form-button">\n        <button class="cancelButton">Cancel</button>\n        <button class="updateButton">Update Task</button>\n    </div>\n</form>',t}()),C(),g(),function(t){v().titleField.value=f(t.target,4).querySelector(".task-title").textContent,v().descriptionField.value=f(t.target,4).querySelector(".task-description").textContent,v().dateField.value=f(t.target,4).querySelector(".task-date").textContent,v().priorityField.value=f(t.target,4).querySelector(".task-priority").textContent,c=!0,t.stopPropagation()}(t);const e=document.querySelector(".updateButton"),n=v().titleField,s=v().descriptionField,o=v().dateField,a=v().priorityField,l=y(t).taskTitle,d=y(t).taskDescription,r=y(t).taskDate,u=y(t).taskPriority,p=Array.from(document.querySelectorAll(".task-list-container .task-list")).indexOf(f(t.target,4)),k=f(t.target,2).querySelector(".task-priority-button");console.log(k),e.addEventListener("click",(t=>{t.preventDefault(),""!==n.value&&""!==s.value&&""!==o.value?(l.textContent=n.value,d.textContent=s.value,r.textContent=o.value,u.textContent=a.value,console.log(o.value),"Low"===a.value?k.style.color="green":"Medium"===a.value?k.style.color="orange":k.style.color="red",(new i).updateTaskList(l.textContent,d.textContent,r.textContent,u.textContent,p),L()):m()}))}function L(){if(l){const t=document.querySelector(".project-form");u().value="",l=!1,t.removeEventListener("keydown",C),n.style.display="flex",s.removeChild(t)}if(d||c){const t=document.querySelector(".popup-field"),e=document.querySelector("main");d=!1,c=!1,e.removeChild(t)}}function h(){const t=document.querySelector(".error-message");document.body.removeChild(t)}function E(t){const e=t.querySelector(".hidden-task");e.clientHeight?(e.style.maxHeight=0,setTimeout((()=>{e.removeAttribute("style")}),300)):(e.style.maxHeight=e.scrollHeight+"px",setTimeout((()=>{e.removeAttribute("style")}),300)),e.classList.toggle("show")}function C(){const t=document.querySelectorAll(".addButton"),e=document.querySelector(".project-form");t.forEach((t=>{t.addEventListener("click",(t=>{t.preventDefault(),l&&p(),d&&function(){const t=document.querySelector(".task-list-container"),e=document.createElement("div");e.classList.add("task-list");const n=document.getElementById("task-title"),s=document.getElementById("task-description"),o=document.getElementById("task-date"),a=document.getElementById("task-priority");if(""===n.value||""===s.value||""===o.value)return void m();const l=new i(n.value,s.value,o.value,a.value);function d(){return L(),l}function c(){const t=document.createElement("span");t.classList.add("task-title"),t.textContent=d().title;const e=document.createElement("span");e.classList.add("task-description"),e.textContent=d().description;const n=document.createElement("span");n.classList.add("task-date"),n.textContent=d().date;const i=document.createElement("span");return i.classList.add("task-priority"),i.textContent=d().priority,{taskName:t,taskDescription:e,taskDate:n,taskPriority:i}}l.setTaskList(l.title,l.description,l.date,l.priority);const u=document.createElement("div");u.classList.add("visible-task-info");const p=document.createElement("div");p.classList.add("hidden-task");const f=document.createElement("div");f.classList.add("hidden-task-info");const v=document.createElement("div");v.classList.add("task-left-column");const y=document.createElement("div");y.classList.add("task-right-column");const k=document.createElement("button");k.classList.add("task-edit-button"),k.innerHTML='<i class= "fa-solid fa-pencil"></i>';const h=document.createElement("button");h.innerHTML='<i class="fa-solid fa-flag"></i>',h.classList.add("task-priority-button"),"Low"===d().priority?h.style.color="green":"Medium"===d().priority?h.style.color="orange":"High"===d().priority&&(h.style.color="red");const C=document.createElement("button");C.classList.add("task-delete-button"),C.innerHTML='<i class= "fa-solid fa-trash"></i>';const g=document.createElement("div");g.classList.add("task-left"),g.appendChild(c().taskName);const b=document.createElement("div");b.classList.add("task-list-controller"),b.appendChild(k),b.appendChild(h),b.appendChild(C),v.appendChild(function(){const t=document.createElement("div");t.classList.add("task-title-info");const e=document.createElement("span");e.style.fontWeight="bold",e.textContent="Title: ";const n=c().taskName;return t.appendChild(e),t.appendChild(n),t}()),v.appendChild(function(){const t=document.createElement("div");t.classList.add("task-date-info");const e=document.createElement("span");e.style.fontWeight="bold",e.textContent="Date: ";const n=c().taskDate;return t.appendChild(e),t.appendChild(n),t}()),y.appendChild(function(){const t=document.createElement("div");t.classList.add("task-description-info");const e=document.createElement("span");e.style.fontWeight="bold",e.textContent="Description: ";const n=c().taskDescription;return t.appendChild(e),t.appendChild(n),t}()),y.appendChild(function(){const t=document.createElement("div");t.classList.add("task-priority-info");const e=document.createElement("span");e.style.fontWeight="bold",e.textContent="Priority: ";const n=c().taskPriority;return t.appendChild(e),t.appendChild(n),t}()),u.appendChild(g),u.appendChild(b),f.appendChild(v),f.appendChild(y),e.appendChild(u),p.appendChild(f),e.appendChild(p),t.appendChild(e),u.addEventListener("click",(()=>{E(e)})),b.removeEventListener("click",E),r=!0}()})),l&&e.addEventListener("keydown",(t=>{"Enter"===t.key&&l&&p()}))}))}function g(){const t=document.querySelectorAll(".cancelButton"),e=document.querySelector(".project-form");t.forEach((t=>{t.addEventListener("click",(t=>{t.preventDefault(),L()})),l&&e.addEventListener("keydown",(t=>{"Escape"===t.key&&l&&L()}))}))}r=0!==t.childNodes.length,n.addEventListener("click",(()=>{n.style.display="none",document.querySelector(".project-list").before(function(){const t=document.createElement("div");t.classList.add("project-form");const e=document.createElement("input");e.setAttribute("id","project-title-input"),e.setAttribute("autocomplete","off"),e.setAttribute("maxlength","12"),e.placeholder="Enter Project Title",setTimeout((()=>{e.focus()}),0);const n=document.createElement("div");n.classList.add("project-form-button");const i=document.createElement("button");i.textContent="Add",i.classList.add("addButton");const s=document.createElement("button");return s.textContent="Cancel",s.classList.add("cancelButton"),n.appendChild(i),n.appendChild(s),t.appendChild(e),t.appendChild(n),t}()),l=!0,C(),g()})),a.addEventListener("click",(()=>{document.querySelector("main").appendChild(function(){const t=document.createElement("div");return t.classList.add("popup-field"),t.innerHTML='<form class="task-form">\n    <fieldset>\n        <div class="column-one">\n            <div class="form-element title">\n                <label for="task-title">Title</label>\n                <input id="task-title" autocomplete = "off">\n            </div>\n\n            <div class="form-element description">\n                <label for="task-description">Description</label>\n                <textarea id="task-description"></textarea>\n            </div>\n        </div>\n\n        <div class="column-two">\n            <div class="form-element date">\n                <label for="task-date">Due Date</label>\n                <input id="task-date" type="date">\n            </div>\n\n            <div class="form-element priority">\n                <label for="task-priority">Priority</label>\n                <select id="task-priority">\n                    <option>Low</option>\n                    <option>Medium</option>\n                    <option>High</option>\n                </select>\n            </div>\n        </div>\n\n    </fieldset>\n    <div class="form-button">\n        <button class="cancelButton">Cancel</button>\n        <button class="addButton">Add Task</button>\n    </div>\n</form>',t}()),d=!0,C(),g()}));const b=new MutationObserver((e=>{e.forEach((e=>{"childList"===e.type&&e.addedNodes.forEach((e=>{e.querySelector(".task-title")&&(e.querySelector(".task-edit-button").addEventListener("click",(t=>{k(t)})),e.querySelector(".task-priority-button").addEventListener("click",(t=>{!function(t){t.stopPropagation()}(t)})),e.querySelector(".task-delete-button").addEventListener("click",(e=>{!function(e){let n;n=e.target.classList.contains("fa-trash")?f(e.target,5):f(e.target,4);const s=document.querySelectorAll(".task-list-container > .task-list"),o=[].indexOf.call(s,n);(new i).removeTaskList(o),t.removeChild(n),e.stopPropagation()}(e)})))}))}))}));b.observe(t,{childList:!0})}()})();