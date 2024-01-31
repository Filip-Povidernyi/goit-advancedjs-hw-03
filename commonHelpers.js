import{a as l,i as m,S as p}from"./assets/vendor-044cfab3.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();l.defaults.headers.common["x-api-key"]="live_xHKc8FIBjkm1E18PddbFIzDWm1A3cqdNob17m8SynQtgQRslGe43lBLgRPbecUZK";async function f(){return(await l.get("https://api.thecatapi.com/v1/breeds")).data}async function h(t){return(await l.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${t}`)).data}const c=document.querySelector(".breed-select"),a=document.querySelector(".loader"),d=document.querySelector(".cat-info"),y=document.querySelector(".error");y.classList.add("is-hidden");c.classList.add("is-hidden");async function g(){try{const t=await f();b(t),c.style.display="flex",v()}catch(t){u(`${t}! Breeds error`)}finally{a.classList.add("is-hidden"),c.classList.remove("is-hidden")}}document.addEventListener("DOMContentLoaded",g);c.addEventListener("change",L);function b(t){const s=t.map(({id:n,name:o})=>`<option value="${n}">${o}</option>`).join("");c.innerHTML=`<select class="breed-select" id="selectElem" placeholder="Cat change">${s}</select>`}async function L(t){try{a.classList.remove("is-hidden"),t.preventDefault();const s=t.currentTarget.value;await h(s).then(n=>{d.style.display="flex";const o=`
                <img class="cat-img" src="${n[0].url}" alt="${n[0].breeds[0].alt_names}" />
                <div class="breed-info">
                  <h1 class="cat-name">${n[0].breeds[0].name}</h1>
                      <p class="description">${n[0].breeds[0].description}</p>
                      <h2 class="temperament">Temperament:</h2>
                      <p class="temp-descr">${n[0].breeds[0].temperament}</p>
                </div>
              `;d.innerHTML=o})}catch(s){u(`${s}! Cat by breed error`)}finally{a.classList.add("is-hidden")}}function v(){new p({select:".breed-select",settings:{placeholderText:"Search breeds"}})}function u(t){m.error({message:`${t} fetching information! Try again!`,position:"topRight"})}
//# sourceMappingURL=commonHelpers.js.map
