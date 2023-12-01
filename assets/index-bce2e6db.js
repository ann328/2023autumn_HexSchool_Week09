import"./main-a82acd0b.js";document.addEventListener("DOMContentLoaded",function(){const t=document.querySelector(".recommendation-wall");t.style.cursor="grab";let r={top:0,left:0,x:0,y:0};const e=function(o){t.style.cursor="grabbing",t.style.userSelect="none",r={left:t.scrollLeft,top:t.scrollTop,x:o.clientX,y:o.clientY},document.addEventListener("mousemove",c),document.addEventListener("mouseup",d)},c=function(o){const p=o.clientX-r.x,m=o.clientY-r.y;t.scrollTop=r.top-m,t.scrollLeft=r.left-p},d=function(){t.style.cursor="grab",t.style.removeProperty("user-select"),document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",d)};t.addEventListener("mousedown",e)});let h=document.querySelector(".menuToggle"),g=document.querySelectorAll(".topBar-menu a"),n=document.querySelector(".topBar-menu");h.addEventListener("click",f);g.forEach(t=>{t.addEventListener("click",$)});function f(){n.classList.contains("openMenu")?n.classList.remove("openMenu"):n.classList.add("openMenu")}function $(){n.classList.remove("openMenu")}const L="2023autumnhexschoolweek09ann328",a=`https://livejs-api.hexschool.io/api/livejs/v1/customer/${L}`,s=document.querySelector(".productWrap"),y=document.querySelector(".productSelect");document.querySelectorAll(".addCardBtn");const i=document.querySelector(".shoppingCart-table");document.querySelectorAll(".discardBtn");function T(){axios.get(`${a}/products`).then(function(t){let r=t.data.products;C(r),y.addEventListener("change",function(e){S(e,r)})}).catch(function(t){console.log(t.response.data)})}s.addEventListener("click",t=>{if(t.preventDefault(),t.target.nodeName!=="A")return;let e={data:{productId:t.target.getAttribute("data-id"),quantity:1}};axios.post(`${a}/carts`,e).then(function(c){l()}).catch(function(c){console.log(c.response.data)})});function l(){axios.get(`${a}/carts`).then(function(t){let r=t.data.carts;u(r)}).catch(function(t){console.log(t.response.data)})}i.addEventListener("click",t=>{t.preventDefault();let r=t.target.getAttribute("data-id");r!==null&&axios.delete(`${a}/carts/${r}`).then(function(e){let c=e.data.carts;u(c)}).catch(function(e){console.log(e.response.data)})});function C(t){let r="";t.forEach(e=>{r+=`<li class="productCard">
    <h4 class="productType">新品</h4>
    <img src="${e.images}"
        alt="">
    <a href="#" class="addCardBtn" data-id="${e.id}">加入購物車</a>
    <h3>${e.title}</h3>
    <del class="originPrice">NT$${e.origin_price}</del>
    <p class="nowPrice">NT$${e.price}</p>
</li>`}),s.innerHTML=r}function u(t){let r=`<tr>
  <th width="40%">品項</th>
  <th width="15%">單價</th>
  <th width="15%">數量</th>
  <th width="15%">金額</th>
  <th width="15%"></th>
</tr>`;t.forEach(e=>{r+=`<tr>
    <td>
        <div class="cardItem-title">
            <img src="${e.product.images}" alt="">
            <p>${e.product.title}</p>
        </div>
    </td>
    <td>NT$${e.product.price}</td>
    <td>${e.quantity}</td>
    <td>NT$${e.product.price*e.quantity}</td>
    <td class="discardBtn">
        <a href="#" class="material-icons" data-id="${e.id}">
            clear
        </a>
    </td>
</tr>`}),i.innerHTML=r}function S(t,r){let e="";r.forEach(c=>{t.target.value===c.category?e+=`<li class="productCard">
          <h4 class="productType">新品</h4>
          <img src="${c.images}"
              alt="">
          <a href="#" class="addCardBtn" data-id="${c.id}">加入購物車</a>
          <h3>${c.title}</h3>
          <del class="originPrice">NT$${c.origin_price}</del>
          <p class="nowPrice">NT$${c.price}</p>
      </li>`:t.target.value==="全部"&&(e+=`<li class="productCard">
          <h4 class="productType">新品</h4>
          <img src="${c.images}"
              alt="">
          <a href="#" class="addCardBtn">加入購物車</a>
          <h3>${c.title}</h3>
          <del class="originPrice">NT$${c.origin_price}</del>
          <p class="nowPrice">NT$${c.price}</p>
      </li>`)}),s.innerHTML=e}T();l();
