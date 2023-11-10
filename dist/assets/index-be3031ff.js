(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function i(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(n){if(n.ep)return;n.ep=!0;const s=i(n);fetch(n.href,s)}})();const L=document.getElementById("word"),k=document.getElementById("wrong-letters"),b=document.getElementById("play-btn"),p=document.getElementById("popup-container"),m=document.getElementById("notifications-container"),h=document.getElementById("final-msg"),v=document.querySelector(".reset");document.querySelector(".letter");const S=document.querySelector(".instructions"),q=document.getElementById("dark-mode-toggle"),I=document.getElementById("virtual-keyboard"),g=document.querySelectorAll(".hangman"),w=new Audio("./assets/short-success-sound.mp3"),A=new Audio("./assets/win-sound.mp3"),B=new Audio("./assets/negative_beeps.mp3"),T=new Audio("./assets/failure-drum-sound.mp3"),c=[],o=[];let y=!1,r;async function d(){y||(r=(await(await fetch("https://trouve-mot.fr/api/random")).json())[0].name,y=!0,console.log(r)),L.innerHTML=`
        ${r.split("").map(e=>`
                <span class="letter">${c.includes(e)?e:""}</span>
                `).join("")}
    `,x()}function x(){const e=L.innerText.replace(/\n/g,""),t=document.getElementById("display-guessing-word");e===r&&(A.play(),h.innerText="Bravo, tu as gagné! 😃",t.style.display="none",p.style.display="flex")}function a(){m.classList.add("display"),setTimeout(()=>{m.classList.remove("display")},2e3)}async function f(){if(k.innerHTML=`${o.map(e=>`<span>${e}</span>`)}`,g.forEach((e,t)=>{const i=o.length;t<i?(e.style.display="block",e.classList.add("shake"),T.play(),setTimeout(()=>{e.classList.remove("shake")},200)):e.style.display="none"}),o.length===g.length){const e=document.getElementById("display-guessing-word");h.innerText="Malheureusement, tu as perdu! 😔",B.play(),e.style.display="block",e.innerText=`Mot caché : ${await r}`,p.style.display="flex"}}function M(){const e=document.body,t=document.querySelectorAll("a"),i=document.querySelector(".figure-content"),l=document.querySelector(".img");e.classList.toggle("dark-mode"),e.className==="dark-mode"?(t.forEach(n=>n.style.color="#fff"),i.style.stroke="#fff",l.style.backgroundColor="#fff"):(t.forEach(n=>n.style.color="black"),i.style.stroke="black",l.style.removeProperty("background-color"))}async function E(){c.splice(0),o.splice(0),y=!1,await d(),f()}function W(){const e=document.querySelector(".instruction-container");e.style.display="flex",e.addEventListener("click",()=>{e.style.display="none"})}window.addEventListener("keydown",e=>{const t=e.key.toLowerCase();/^[a-zàâçéèêëîïôûùüÿœæ]$/.test(t)&&(r.includes(t)?c.includes(t)?a():(c.push(t),w.play(),d()):o.includes(t)?a():(o.push(t),f()))});I.addEventListener("click",e=>{if(e.target.classList.contains("keyboard-button")){const t=e.target.textContent.toLowerCase();r.includes(t)?c.includes(t)?a():(c.push(t),w.play(),d()):o.includes(t)?a():(o.push(t),f())}});b.addEventListener("click",()=>{E(),p.style.display="none"});S.addEventListener("click",W);q.addEventListener("change",M);v.addEventListener("click",E);d();
