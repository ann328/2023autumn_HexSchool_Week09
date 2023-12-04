import"./main-ef25cd4c.js";let y=document.querySelector(".menuToggle"),b=document.querySelectorAll(".topBar-menu a"),u=document.querySelector(".topBar-menu");y.addEventListener("click",k);b.forEach(e=>{e.addEventListener("click",m)});function k(){u.classList.contains("openMenu")?u.classList.remove("openMenu"):u.classList.add("openMenu")}function m(){u.classList.remove("openMenu")}const L="2023autumnhexschoolweek09ann328",A="BBOYCmw9gXax22kPIGHoqCpRU802",l={headers:{Authorization:A}},i=`https://livejs-api.hexschool.io/api/livejs/v1/admin/${L}`,f=document.querySelector(".orderPage-table"),D=document.querySelector(".discardAllBtn");function p(){axios.get(`${i}/orders`,l).then(function(e){let a=e.data.orders;E(a)}).catch(function(e){console.log(e.response)})}f.addEventListener("click",e=>{e.preventDefault();let a=e.target.getAttribute("data-orderid");a!==null&&axios.put(`${i}/orders`,{data:{id:a,paid:!0}},l).then(function(n){p(),alert("恭喜完成訂單！")}).catch(function(n){console.log(n.response)})});f.addEventListener("click",e=>{e.preventDefault();let a=e.target.getAttribute("data-id");e.target.getAttribute("data-id")!==null&&axios.delete(`${i}/orders/${a}`,l).then(function(n){p(),alert("已刪除此筆訂單")}).catch(function(n){console.log(n.response)})});D.addEventListener("click",e=>{axios.delete(`${i}/orders`,l).then(function(a){alert("已經刪除全部訂單了！"),p()}).catch(function(a){alert(`${a.response.data.message}`)})});function E(e){let a={},n={},s=`<thead>
    <tr>
        <th>訂單編號</th>
        <th>聯絡人</th>
        <th>聯絡地址</th>
        <th>電子郵件</th>
        <th>訂單品項</th>
        <th>訂單日期</th>
        <th>訂單狀態</th>
        <th>操作</th>
    </tr>
</thead>`;e.forEach(t=>{let c="";t.products.forEach(d=>{c+=`<p>${d.title}*${d.quantity}</p>`,a[d.category]?a[d.category]+=d.price:a[d.category]=d.price,n[d.title]?n[d.title]+=d.price:n[d.title]=d.price}),t.paid===!1?s+=`<tr>
      <td>${t.id}</td>
      <td>
          <p>${t.user.name}</p>
          <p>${t.user.tel}</p>
      </td>
      <td>${t.user.address}</td>
      <td>${t.user.email}</td>
      <td>
      ${c}
      </td>
      <td>${new Date(t.createdAt*1e3).toLocaleDateString()}</td>
      <td class="orderStatus">
          <a href="#" data-orderid="${t.id}" data-orderstatus="${t.paid}">未處理</a>
      </td>
      <td>
          <input type="button" class="delSingleOrder-Btn" data-id="${t.id}" value="刪除">
      </td>
  </tr>`:s+=`<tr>
    <td>${t.id}</td>
    <td>
        <p>${t.user.name}</p>
        <p>${t.user.tel}</p>
    </td>
    <td>${t.user.address}</td>
    <td>${t.user.email}</td>
    <td>
    ${c}
    </td>
    <td>${new Date(t.createdAt*1e3).toLocaleDateString()}</td>
    <td class="orderStatus">
        <a href="#" data-orderid="${t.id}" data-orderstatus="${t.paid}">已處理</a>
    </td>
    <td>
        <input type="button" class="delSingleOrder-Btn" data-id="${t.id}" value="刪除">
    </td>
</tr>`}),f.innerHTML=s,S(a,n)}function S(e,a){let n=Object.keys(e),s=[];n.forEach(r=>{s.push([r,e[r]])});let t=Object.keys(a),c=[];t.forEach(r=>{c.push({product:r,productRevenue:a[r]})}),c.sort((r,o)=>o.productRevenue-r.productRevenue);let d=c.slice(0,3),$=c.slice(3),g=0,h=[];d.forEach(r=>{h.push([r.product,r.productRevenue])}),$.forEach((r,o)=>{g+=r.productRevenue}),h.push(["其他",g]),c3.generate({bindto:"#chart",data:{type:"pie",columns:s,color:function(r,o){return o.id&&o.id==="data3"?d3.rgb(r).darker(o.value/150):r}}}),c3.generate({bindto:"#chartRevenue",data:{type:"pie",columns:h,color:function(r,o){return o.id&&o.id==="data3"?d3.rgb(r).darker(o.value/150):r}}})}p();
