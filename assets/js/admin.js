// api
const apiPath = "2023autumnhexschoolweek09ann328";
const token = "BBOYCmw9gXax22kPIGHoqCpRU802";
const apiToken = {
  headers: {
    Authorization: token,
  },
};
const customerApiUrl = `https://livejs-api.hexschool.io/api/livejs/v1/admin/${apiPath}`;

// -----------------------------------------------------------
// Dom
const orderPageTable = document.querySelector(".orderPage-table");
const discardAllBtn = document.querySelector(".discardAllBtn");
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
      alert(`恭喜完成訂單！`);
    })
    .catch(function (error) {
      console.log(error.response);
    });
});
// 刪除特定訂單 btn監聽 & api
orderPageTable.addEventListener("click", (e) => {
  e.preventDefault();
  let orderId = e.target.getAttribute("data-id");
  if (e.target.getAttribute("data-id") === null) {
    return;
  }
  axios
    .delete(`${customerApiUrl}/orders/${orderId}`, apiToken)
    .then(function (res) {
      getOrderList();
      alert(`已刪除此筆訂單`);
    })
    .catch(function (error) {
      console.log(error.response);
    });
});
// 刪除全部訂單 btn監聽 & api
discardAllBtn.addEventListener("click", (e) => {
  axios
    .delete(`${customerApiUrl}/orders`, apiToken)
    .then(function (res) {
      alert(`已經刪除全部訂單了！`);
      getOrderList();
    })
    .catch(function (error) {
      alert(`${error.response.data.message}`);
    });
});

// -----------------------------------------------------------
// 取得訂單列表 fn
function orderList(data) {
  let productsc3CategoryData = {};
  let productsc3PriceData = {};
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
      // console.log(item);
      productsStr += `<p>${item.title}*${item.quantity}</p>`;
      if (!productsc3CategoryData[item.category]) {
        productsc3CategoryData[item.category] = item.price;
      } else {
        productsc3CategoryData[item.category] += item.price;
      }
      if (!productsc3PriceData[item.title]) {
        productsc3PriceData[item.title] = item.price;
      } else {
        productsc3PriceData[item.title] += item.price;
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
  renderProductsData(productsc3CategoryData, productsc3PriceData); // 執行c3
}
// c3 fn
function renderProductsData(categoryData, priceData) {
  let categoryDataKeys = Object.keys(categoryData);
  let categoryDataArr = [];
  categoryDataKeys.forEach((v) => {
    categoryDataArr.push([v, categoryData[v]]);
  });
  let priceDataKeys = Object.keys(priceData);
  let priceDataArr = [];
  priceDataKeys.forEach((v) => {
    priceDataArr.push([v, priceData[v]]);
  });
  let chart = c3.generate({
    bindto: "#chart", // HTML 元素綁定
    data: {
      type: "pie",
      columns: categoryDataArr,
      color: function (color, d) {
        // d will be 'id' when called for legends
        return d.id && d.id === "data3"
          ? d3.rgb(color).darker(d.value / 150)
          : color;
      },
    },
  });
  let chartRevenue = c3.generate({
    bindto: "#chartRevenue", // HTML 元素綁定
    data: {
      type: "pie",
      columns: priceDataArr,
      color: function (color, d) {
        // d will be 'id' when called for legends
        return d.id && d.id === "data3"
          ? d3.rgb(color).darker(d.value / 150)
          : color;
      },
    },
  });
}

// -----------------------------------------------------------
// 呼叫
getOrderList(); // 取得訂單列表
