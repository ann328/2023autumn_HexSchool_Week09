(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const s of c.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(n){if(n.ep)return;n.ep=!0;const c=t(n);fetch(n.href,c)}})();document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".recommendation-wall");e.style.cursor="grab";let r={top:0,left:0,x:0,y:0};const t=function(c){e.style.cursor="grabbing",e.style.userSelect="none",r={left:e.scrollLeft,top:e.scrollTop,x:c.clientX,y:c.clientY},document.addEventListener("mousemove",o),document.addEventListener("mouseup",n)},o=function(c){const s=c.clientX-r.x,f=c.clientY-r.y;e.scrollTop=r.top-f,e.scrollLeft=r.left-s},n=function(){e.style.cursor="grab",e.style.removeProperty("user-select"),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",n)};e.addEventListener("mousedown",t)});let h=document.querySelector(".menuToggle"),g=document.querySelectorAll(".topBar-menu a"),i=document.querySelector(".topBar-menu");h.addEventListener("click",y);g.forEach(e=>{e.addEventListener("click",L)});function y(){i.classList.contains("openMenu")?i.classList.remove("openMenu"):i.classList.add("openMenu")}function L(){i.classList.remove("openMenu")}let $=document.querySelector(".menuToggle"),E=document.querySelectorAll(".topBar-menu a"),a=document.querySelector(".topBar-menu");$.addEventListener("click",S);E.forEach(e=>{e.addEventListener("click",T)});function S(){a.classList.contains("openMenu")?a.classList.remove("openMenu"):a.classList.add("openMenu")}function T(){a.classList.remove("openMenu")}const P="2023autumnhexschoolweek09ann328",l=`https://livejs-api.hexschool.io/api/livejs/v1/customer/${P}`,d=document.querySelector(".productWrap"),C=document.querySelector(".productSelect");document.querySelectorAll(".addCardBtn");const u=document.querySelector(".shoppingCart-table");document.querySelectorAll(".discardBtn");function v(){axios.get(`${l}/products`).then(function(e){let r=e.data.products;q(r),C.addEventListener("change",function(t){A(t,r)})}).catch(function(e){console.log(e.response.data)})}d.addEventListener("click",e=>{if(e.preventDefault(),e.target.nodeName!=="A")return;let t={data:{productId:e.target.getAttribute("data-id"),quantity:1}};axios.post(`${l}/carts`,t).then(function(o){p()}).catch(function(o){console.log(o.response.data)})});function p(){axios.get(`${l}/carts`).then(function(e){let r=e.data.carts;m(r)}).catch(function(e){console.log(e.response.data)})}u.addEventListener("click",e=>{e.preventDefault();let r=e.target.getAttribute("data-id");r!==null&&axios.delete(`${l}/carts/${r}`).then(function(t){let o=t.data.carts;m(o)}).catch(function(t){console.log(t.response.data)})});function q(e){let r="";e.forEach(t=>{r+=`<li class="productCard">
    <h4 class="productType">新品</h4>
    <img src="${t.images}"
        alt="">
    <a href="#" class="addCardBtn" data-id="${t.id}">加入購物車</a>
    <h3>${t.title}</h3>
    <del class="originPrice">NT$${t.origin_price}</del>
    <p class="nowPrice">NT$${t.price}</p>
</li>`}),d.innerHTML=r}function m(e){let r=`<tr>
  <th width="40%">品項</th>
  <th width="15%">單價</th>
  <th width="15%">數量</th>
  <th width="15%">金額</th>
  <th width="15%"></th>
</tr>`;e.forEach(t=>{r+=`<tr>
    <td>
        <div class="cardItem-title">
            <img src="${t.product.images}" alt="">
            <p>${t.product.title}</p>
        </div>
    </td>
    <td>NT$${t.product.price}</td>
    <td>${t.quantity}</td>
    <td>NT$${t.product.price*t.quantity}</td>
    <td class="discardBtn">
        <a href="#" class="material-icons" data-id="${t.id}">
            clear
        </a>
    </td>
</tr>`}),u.innerHTML=r}function A(e,r){let t="";r.forEach(o=>{e.target.value===o.category?t+=`<li class="productCard">
          <h4 class="productType">新品</h4>
          <img src="${o.images}"
              alt="">
          <a href="#" class="addCardBtn" data-id="${o.id}">加入購物車</a>
          <h3>${o.title}</h3>
          <del class="originPrice">NT$${o.origin_price}</del>
          <p class="nowPrice">NT$${o.price}</p>
      </li>`:e.target.value==="全部"&&(t+=`<li class="productCard">
          <h4 class="productType">新品</h4>
          <img src="${o.images}"
              alt="">
          <a href="#" class="addCardBtn">加入購物車</a>
          <h3>${o.title}</h3>
          <del class="originPrice">NT$${o.origin_price}</del>
          <p class="nowPrice">NT$${o.price}</p>
      </li>`)}),d.innerHTML=t}v();p();c3.generate({bindto:"#chart",data:{type:"pie",columns:[["Louvre 雙人床架",1],["Antony 雙人床架",2],["Anty 雙人床架",3],["其他",4]],colors:{"Louvre 雙人床架":"#DACBFF","Antony 雙人床架":"#9D7FEA","Anty 雙人床架":"#5434A7",其他:"#301E5F"}}});console.log("Hello world!");
