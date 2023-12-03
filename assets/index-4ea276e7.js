import"./main-ef25cd4c.js";document.addEventListener("DOMContentLoaded",function(){const t=document.querySelector(".recommendation-wall");t.style.cursor="grab";let e={top:0,left:0,x:0,y:0};const n=function(c){t.style.cursor="grabbing",t.style.userSelect="none",e={left:t.scrollLeft,top:t.scrollTop,x:c.clientX,y:c.clientY},document.addEventListener("mousemove",r),document.addEventListener("mouseup",o)},r=function(c){const s=c.clientX-e.x,f=c.clientY-e.y;t.scrollTop=e.top-f,t.scrollLeft=e.left-s},o=function(){t.style.cursor="grab",t.style.removeProperty("user-select"),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",o)};t.addEventListener("mousedown",n)});let h=document.querySelector(".menuToggle"),$=document.querySelectorAll(".topBar-menu a"),l=document.querySelector(".topBar-menu");h.addEventListener("click",L);$.forEach(t=>{t.addEventListener("click",y)});function L(){l.classList.contains("openMenu")?l.classList.remove("openMenu"):l.classList.add("openMenu")}function y(){l.classList.remove("openMenu")}const C="2023autumnhexschoolweek09ann328",d=`https://livejs-api.hexschool.io/api/livejs/v1/customer/${C}`,E={姓名:{presence:{message:"是必填欄位"}},電話:{presence:{message:"是必填欄位"},length:{minimum:9,message:"請輸入正確格式"}},Email:{presence:{message:"是必填欄位"},email:{message:"請輸入正確格式"}},寄送地址:{presence:{message:"是必填欄位"},length:{minimum:6,message:"請輸入完整"}}};let a={payment:"ATM"};const m=document.querySelector(".productWrap"),A=document.querySelector(".productSelect");document.querySelectorAll(".addCardBtn");const i=document.querySelector(".shoppingCart-table");document.querySelectorAll(".discardBtn");const S=document.querySelector(".orderInfo-form"),T=document.querySelectorAll(".orderInfo-inputWrap"),v=document.querySelectorAll(".orderInfo-input");document.querySelector("#customerName").value;const p=document.querySelectorAll(".orderInfo-message"),b=document.querySelector(".orderInfo-btn");function I(){axios.get(`${d}/products`).then(function(t){let e=t.data.products;P(e),A.addEventListener("change",function(n){B(n,e)})}).catch(function(t){console.log(t.response.data)})}m.addEventListener("click",t=>{if(t.preventDefault(),t.target.nodeName!=="A")return;let n={data:{productId:t.target.getAttribute("data-id"),quantity:1}};axios.post(`${d}/carts`,n).then(function(r){u(),alert("已加入購物車！")}).catch(function(r){console.log(r.response.data)})});function u(){axios.get(`${d}/carts`).then(function(t){let e=t.data.carts;g(e)}).catch(function(t){console.log(t.response.data)})}i.addEventListener("click",t=>{t.preventDefault();let e=t.target.getAttribute("data-id");e!==null&&axios.delete(`${d}/carts/${e}`).then(function(n){let r=n.data.carts;g(r),alert("已從購物車刪除此項產品！")}).catch(function(n){console.log(n.response.data)})});i.addEventListener("click",t=>{t.preventDefault(),t.target.getAttribute("class")==="discardAllBtn"&&axios.delete(`${d}/carts`).then(function(n){u(),alert("已清空購物車。")}).catch(function(n){console.log(n.response.data)})});b.addEventListener("click",t=>{t.preventDefault(),axios.post(`${d}/orders`,{data:{user:a}}).then(function(e){S.reset(),u(),alert("感謝您的預定，我們會盡快處理您的訂單，謝謝。")}).catch(function(e){alert(e.response.data.message)})});function P(t){let e="";t.forEach(n=>{e+=`<li class="productCard">
    <h4 class="productType">新品</h4>
    <img src="${n.images}"
        alt="">
    <a href="#" class="addCardBtn" data-id="${n.id}">加入購物車</a>
    <h3>${n.title}</h3>
    <del class="originPrice">NT$${n.origin_price}</del>
    <p class="nowPrice">NT$${n.price}</p>
</li>`}),m.innerHTML=e}function g(t){let e=`<tr>
  <th width="40%">品項</th>
  <th width="15%">單價</th>
  <th width="15%">數量</th>
  <th width="15%">金額</th>
  <th width="15%"></th>
</tr>`,n=0;t.forEach(r=>{n+=r.product.price,e+=`<tr>
    <td>
        <div class="cardItem-title">
            <img src="${r.product.images}" alt="">
            <p>${r.product.title}</p>
        </div>
    </td>
    <td>NT$${r.product.price}</td>
    <td>${r.quantity}</td>
    <td>NT$${r.product.price*r.quantity}</td>
    <td class="discardBtn">
        <a href="#" class="material-icons" data-id="${r.id}">
            clear
        </a>
    </td>
</tr>`}),t.length===0?i.innerHTML=e:i.innerHTML=e+q(n)}function q(t){return`<tr>
  <td>
    <a href="#" class="discardAllBtn">刪除所有品項</a>
  </td>
  <td></td>
  <td></td>
  <td>
    <p>總金額</p>
  </td>
  <td>NT$${t}</td>
  </tr>`}function B(t,e){let n="";e.forEach(r=>{t.target.value===r.category?n+=`<li class="productCard">
          <h4 class="productType">新品</h4>
          <img src="${r.images}"
              alt="">
          <a href="#" class="addCardBtn" data-id="${r.id}">加入購物車</a>
          <h3>${r.title}</h3>
          <del class="originPrice">NT$${r.origin_price}</del>
          <p class="nowPrice">NT$${r.price}</p>
      </li>`:t.target.value==="全部"&&(n+=`<li class="productCard">
          <h4 class="productType">新品</h4>
          <img src="${r.images}"
              alt="">
          <a href="#" class="addCardBtn">加入購物車</a>
          <h3>${r.title}</h3>
          <del class="originPrice">NT$${r.origin_price}</del>
          <p class="nowPrice">NT$${r.price}</p>
      </li>`)}),m.innerHTML=n}let x=function(){let t={};T.forEach(e=>{e.addEventListener("change",n=>{t[n.target.getAttribute("name")]=n.target.value;let r=validate(t,E);r?Object.keys(r).forEach((o,c)=>{p.forEach(s=>{s.getAttribute("data-message")===o?s.textContent=r[o]:r[s.getAttribute("data-message")]||(s.textContent="")})}):p.forEach(o=>{o.textContent=""})})})};function M(){return v.forEach(t=>{t.addEventListener("change",e=>{e.target.getAttribute("name")==="姓名"?a.name=e.target.value:e.target.getAttribute("name")==="電話"?a.tel=e.target.value:e.target.getAttribute("name")==="Email"?a.email=e.target.value:e.target.getAttribute("name")==="寄送地址"?a.address=e.target.value:e.target.getAttribute("name")==="交易方式"&&(a.payment=e.target.value)})}),a}I();u();x();M();
