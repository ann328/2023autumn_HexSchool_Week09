import"./main-ef25cd4c.js";let h=document.querySelector(".menuToggle"),g=document.querySelectorAll(".topBar-menu a"),c=document.querySelector(".topBar-menu");h.addEventListener("click",f);g.forEach(r=>{r.addEventListener("click",$)});function f(){c.classList.contains("openMenu")?c.classList.remove("openMenu"):c.classList.add("openMenu")}function $(){c.classList.remove("openMenu")}const y="2023autumnhexschoolweek09ann328",b="BBOYCmw9gXax22kPIGHoqCpRU802",i={headers:{Authorization:b}},l=`https://livejs-api.hexschool.io/api/livejs/v1/admin/${y}`,p=document.querySelector(".orderPage-table"),k=document.querySelector(".discardAllBtn");function u(){axios.get(`${l}/orders`,i).then(function(r){let a=r.data.orders;m(a)}).catch(function(r){console.log(r.response)})}p.addEventListener("click",r=>{r.preventDefault();let a=r.target.getAttribute("data-orderid");a!==null&&axios.put(`${l}/orders`,{data:{id:a,paid:!0}},i).then(function(d){u(),alert("恭喜完成訂單！")}).catch(function(d){console.log(d.response)})});p.addEventListener("click",r=>{r.preventDefault();let a=r.target.getAttribute("data-id");r.target.getAttribute("data-id")!==null&&axios.delete(`${l}/orders/${a}`,i).then(function(d){u(),alert("已刪除此筆訂單")}).catch(function(d){console.log(d.response)})});k.addEventListener("click",r=>{axios.delete(`${l}/orders`,i).then(function(a){alert("已經刪除全部訂單了！"),u()}).catch(function(a){alert(`${a.response.data.message}`)})});function m(r){let a={},d={},o=`<thead>
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
</thead>`;r.forEach(e=>{let s="";e.products.forEach(t=>{s+=`<p>${t.title}*${t.quantity}</p>`,a[t.category]?a[t.category]+=t.price:a[t.category]=t.price,d[t.title]?d[t.title]+=t.price:d[t.title]=t.price}),e.paid===!1?o+=`<tr>
      <td>${e.id}</td>
      <td>
          <p>${e.user.name}</p>
          <p>${e.user.tel}</p>
      </td>
      <td>${e.user.address}</td>
      <td>${e.user.email}</td>
      <td>
      ${s}
      </td>
      <td>${new Date(e.createdAt*1e3).toLocaleDateString()}</td>
      <td class="orderStatus">
          <a href="#" data-orderid="${e.id}" data-orderstatus="${e.paid}">未處理</a>
      </td>
      <td>
          <input type="button" class="delSingleOrder-Btn" data-id="${e.id}" value="刪除">
      </td>
  </tr>`:o+=`<tr>
    <td>${e.id}</td>
    <td>
        <p>${e.user.name}</p>
        <p>${e.user.tel}</p>
    </td>
    <td>${e.user.address}</td>
    <td>${e.user.email}</td>
    <td>
    ${s}
    </td>
    <td>${new Date(e.createdAt*1e3).toLocaleDateString()}</td>
    <td class="orderStatus">
        <a href="#" data-orderid="${e.id}" data-orderstatus="${e.paid}">已處理</a>
    </td>
    <td>
        <input type="button" class="delSingleOrder-Btn" data-id="${e.id}" value="刪除">
    </td>
</tr>`}),p.innerHTML=o,L(a,d)}function L(r,a){let d=Object.keys(r),o=[];d.forEach(t=>{o.push([t,r[t]])});let e=Object.keys(a),s=[];e.forEach(t=>{s.push([t,a[t]])}),c3.generate({bindto:"#chart",data:{type:"pie",columns:o,color:function(t,n){return n.id&&n.id==="data3"?d3.rgb(t).darker(n.value/150):t}}}),c3.generate({bindto:"#chartRevenue",data:{type:"pie",columns:s,color:function(t,n){return n.id&&n.id==="data3"?d3.rgb(t).darker(n.value/150):t}}})}u();
