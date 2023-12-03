// api
const apiPath = "2023autumnhexschoolweek09ann328";
const token = "BBOYCmw9gXax22kPIGHoqCpRU802";
const apiToken = {
  headers: {
    Authorization: token,
  },
};
const customerApiUrl = `https://livejs-api.hexschool.io/api/livejs/v1/admin/${apiPath}`;
let productsc3Data = {};
// -----------------------------------------------------------
// Dom
const orderPageTable = document.querySelector(".orderPage-table");

// -----------------------------------------------------------
// 取得訂單列表 api
function getOrderList() {
  axios
    .get(`${customerApiUrl}/orders`, apiToken)
    .then(function (res) {
      let data = res.data.orders;
      orderList(data);
    })
    .catch(function (error) {
      console.log(error.response);
    });
}
// 修改訂單狀態 btn監聽 & api
orderPageTable.addEventListener("click", (e) => {
  e.preventDefault();
  let orderId = e.target.getAttribute("data-orderid");
  if (orderId === null) {
    return;
  }
  axios
    .put(
      `${customerApiUrl}/orders`,
      {
        data: {
          id: orderId,
          paid: true,
        },
      },
      apiToken
    )
    .then(function (res) {
      getOrderList();
    })
    .catch(function (error) {
      console.log(error.response);
    });
});

// -----------------------------------------------------------
// 取得訂單列表 fn
function orderList(data) {
  let renderOrderPageTable = `<thead>
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
</thead>`;
  data.forEach((v) => {
    let productsStr = ``;
    v.products.forEach((item) => {
      productsStr += `<p>${item.title}*${item.quantity}</p>`;
      if (!productsc3Data[item.title]) {
        productsc3Data[item.title] = item.quantity;
      } else {
        productsc3Data[item.title] += item.quantity;
      }
    });
    if (v.paid === false) {
      renderOrderPageTable += `<tr>
      <td>${v.id}</td>
      <td>
          <p>${v.user.name}</p>
          <p>${v.user.tel}</p>
      </td>
      <td>${v.user.address}</td>
      <td>${v.user.email}</td>
      <td>
      ${productsStr}
      </td>
      <td>${new Date(v.createdAt * 1000).toLocaleDateString()}</td>
      <td class="orderStatus">
          <a href="#" data-orderid="${v.id}" data-orderstatus="${
        v.paid
      }">未處理</a>
      </td>
      <td>
          <input type="button" class="delSingleOrder-Btn" data-id="${
            v.id
          }" value="刪除">
      </td>
  </tr>`;
    } else {
      renderOrderPageTable += `<tr>
    <td>${v.id}</td>
    <td>
        <p>${v.user.name}</p>
        <p>${v.user.tel}</p>
    </td>
    <td>${v.user.address}</td>
    <td>${v.user.email}</td>
    <td>
    ${productsStr}
    </td>
    <td>${new Date(v.createdAt * 1000).toLocaleDateString()}</td>
    <td class="orderStatus">
        <a href="#" data-orderid="${v.id}" data-orderstatus="${
        v.paid
      }">已處理</a>
    </td>
    <td>
        <input type="button" class="delSingleOrder-Btn" data-id="${
          v.id
        }" value="刪除">
    </td>
</tr>`;
    }
  });
  orderPageTable.innerHTML = renderOrderPageTable;
  return productsc3Data;
}
// c3 fn
function renderProductsData(data) {
  let objKeys = Object.keys(data);
  console.log(objKeys);
  let chart = c3.generate({
    bindto: "#chart", // HTML 元素綁定
    data: {
      type: "pie",
      columns: [
        ["Louvre 雙人床架", 1],
        ["Antony 雙人床架", 2],
        ["Anty 雙人床架", 3],
        ["其他", 4],
      ],
      colors: {
        "Louvre 雙人床架": "#DACBFF",
        "Antony 雙人床架": "#9D7FEA",
        "Anty 雙人床架": "#5434A7",
        其他: "#301E5F",
      },
    },
  });
}

// -----------------------------------------------------------
// 呼叫
getOrderList(); // 取得訂單列表
console.log(productsc3Data);
renderProductsData(productsc3Data); // c3
