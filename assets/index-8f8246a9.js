(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function u(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=u(e);fetch(e.href,t)}})();const f=["watch"];function l(n){const r=new Map,u={watch(e,t){if(!r.has(e)){r.set(e,[t]);return}r.get(e).push(t)}},s=new Proxy(Object.assign(n,u),{get(e,t,o){return Reflect.get(e,t,o)},set(e,t,o,a){const c=t,m=s[c]!==o;if(f.indexOf(c)!==-1)throw new Error(`Cannot override a reserved property: ${String(c)}`);return m&&r.has(c)&&r.get(c).forEach(h=>{h({[c]:o})}),Reflect.set(e,t,o,a)}});return s}const g=document.getElementById("counter"),p=document.getElementById("incrementButton"),y=document.getElementById("decrementButton"),d=l({counter:0,increment(){this.counter=++this.counter},decrement(){this.counter!==0&&(this.counter=--this.counter)}});p.addEventListener("click",()=>{d.increment()});y.addEventListener("click",()=>{d.decrement()});d.watch("counter",({counter:n})=>{g.textContent=String(n)});const E=document.getElementById("content"),w=document.getElementById("contentMirror"),L=document.getElementById("contentLength"),i=l({content:"",length:0,updateContent(n){this.content=n},updateLength(n){this.length=n}});i.watch("content",({content:n})=>{w.textContent=n});i.watch("length",({length:n})=>{L.textContent=String(n)});E.addEventListener("input",({target:n})=>{const r=n;i.updateLength(r.textLength),i.updateContent(r.value)});
