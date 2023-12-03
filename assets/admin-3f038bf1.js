import"./main-ef25cd4c.js";let c=document.querySelector(".menuToggle"),p=document.querySelectorAll(".topBar-menu a"),n=document.querySelector(".topBar-menu");c.addEventListener("click",h);p.forEach(e=>{e.addEventListener("click",$)});function h(){n.classList.contains("openMenu")?n.classList.remove("openMenu"):n.classList.add("openMenu")}function $(){n.classList.remove("openMenu")}const g="2023autumnhexschoolweek09ann328",f="BBOYCmw9gXax22kPIGHoqCpRU802",s={headers:{Authorization:f}},l=`https://livejs-api.hexschool.io/api/livejs/v1/admin/${g}`;let a={};const i=document.querySelector(".orderPage-table");function u(){axios.get(`${l}/orders`,s).then(function(e){let d=e.data.orders;m(d)}).catch(function(e){console.log(e.response)})}i.addEventListener("click",e=>{e.preventDefault();let d=e.target.getAttribute("data-orderid");d!==null&&axios.put(`${l}/orders`,{data:{id:d,paid:!0}},s).then(function(t){u()}).catch(function(t){console.log(t.response)})});function m(e){let d=`<thead>
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
</thead>`;return e.forEach(t=>{let o="";t.products.forEach(r=>{o+=`<p>${r.title}*${r.quantity}</p>`,a[r.title]?a[r.title]+=r.quantity:a[r.title]=r.quantity}),t.paid===!1?d+=`<tr>
      <td>${t.id}</td>
      <td>
          <p>${t.user.name}</p>
          <p>${t.user.tel}</p>
      </td>
      <td>${t.user.address}</td>
      <td>${t.user.email}</td>
      <td>
      ${o}
      </td>
      <td>${new Date(t.createdAt*1e3).toLocaleDateString()}</td>
      <td class="orderStatus">
          <a href="#" data-orderid="${t.id}" data-orderstatus="${t.paid}">未處理</a>
      </td>
      <td>
          <input type="button" class="delSingleOrder-Btn" data-id="${t.id}" value="刪除">
      </td>
  </tr>`:d+=`<tr>
    <td>${t.id}</td>
    <td>
        <p>${t.user.name}</p>
        <p>${t.user.tel}</p>
    </td>
    <td>${t.user.address}</td>
    <td>${t.user.email}</td>
    <td>
    ${o}
    </td>
    <td>${new Date(t.createdAt*1e3).toLocaleDateString()}</td>
    <td class="orderStatus">
        <a href="#" data-orderid="${t.id}" data-orderstatus="${t.paid}">已處理</a>
    </td>
    <td>
        <input type="button" class="delSingleOrder-Btn" data-id="${t.id}" value="刪除">
    </td>
</tr>`}),i.innerHTML=d,a}function y(e){let d=Object.keys(e);console.log(d),c3.generate({bindto:"#chart",data:{type:"pie",columns:[["Louvre 雙人床架",1],["Antony 雙人床架",2],["Anty 雙人床架",3],["其他",4]],colors:{"Louvre 雙人床架":"#DACBFF","Antony 雙人床架":"#9D7FEA","Anty 雙人床架":"#5434A7",其他:"#301E5F"}}})}u();console.log(a);y(a);
