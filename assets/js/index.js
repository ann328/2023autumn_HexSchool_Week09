// api
const apiPath = "2023autumnhexschoolweek09ann328";
const customerApiUrl = `https://livejs-api.hexschool.io/api/livejs/v1/customer/${apiPath}`;
// form
const constraints = {
  姓名: {
    presence: {
      message: "是必填欄位",
    },
  },
  電話: {
    presence: {
      message: "是必填欄位",
    },
    length: { minimum: 9, message: "請輸入正確格式" },
  },
  Email: {
    presence: {
      message: "是必填欄位",
    },
    email: {
      message: "請輸入正確格式",
    },
  },
  寄送地址: {
    presence: {
      message: "是必填欄位",
    },
    length: { minimum: 6, message: "請輸入完整" },
  },
};
let customerContactInformation = { payment: "ATM" };
let customerProductCartListData = {};
// -----------------------------------------------------------
// Dom
const productWrap = document.querySelector(".productWrap");
const productSelect = document.querySelector(".productSelect");
const addCardBtn = document.querySelectorAll(".addCardBtn");
const shoppingCartTable = document.querySelector(".shoppingCart-table");
const discardBtn = document.querySelectorAll(".discardBtn");
const orderInfoForm = document.querySelector(".orderInfo-form");
const orderInfoInputWrap = document.querySelectorAll(".orderInfo-inputWrap");
const orderInfoInput = document.querySelectorAll(".orderInfo-input");
const customerName = document.querySelector("#customerName").value;
const orderInfoMessage = document.querySelectorAll(".orderInfo-message");
const orderInfoBtn = document.querySelector(".orderInfo-btn");

// -----------------------------------------------------------
// 取得產品列表 api
function getProductList() {
  axios
    .get(`${customerApiUrl}/products`)
    .then(function (res) {
      let data = res.data.products;
      productList(data);
      productSelect.addEventListener("change", function (e) {
        productSelectFilter(e, data);
      });
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
}
// 加入購物車 btn監聽 & api
productWrap.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.nodeName !== "A") {
    return;
  }
  let productId = e.target.getAttribute("data-id");
  let addCustomerProductData = {
    data: {
      productId: productId,
      quantity: 1,
    },
  };
  axios
    .post(`${customerApiUrl}/carts`, addCustomerProductData)
    .then(function (res) {
      getCartList();
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});
// 取得購物車列表 api
function getCartList() {
  axios
    .get(`${customerApiUrl}/carts`)
    .then(function (res) {
      let data = res.data.carts;
      customerProductCartList(data);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
}
// 清除購物車內特定產品 btn監聽 & api
shoppingCartTable.addEventListener("click", (e) => {
  e.preventDefault();
  let customerProductCartListID = e.target.getAttribute("data-id");
  if (customerProductCartListID === null) {
    return;
  }
  axios
    .delete(`${customerApiUrl}/carts/${customerProductCartListID}`)
    .then(function (res) {
      let data = res.data.carts;
      customerProductCartList(data);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});

// 清除購物車內全部產品 btn監聽 & api
shoppingCartTable.addEventListener("click", (e) => {
  e.preventDefault();
  let discardAllBtn = e.target.getAttribute("class");
  if (discardAllBtn === "discardAllBtn") {
    axios
      .delete(`${customerApiUrl}/carts`)
      .then(function (res) {
        getCartList();
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }
});

// 送出購買訂單 btn監聽 & api
orderInfoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  axios
    .post(`${customerApiUrl}/orders`, {
      data: {
        user: customerContactInformation,
      },
    })
    .then(function (res) {
      orderInfoForm.reset();
      getCartList();
      console.log(res.data);
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });
});

// -----------------------------------------------------------
// 取得產品列表 fn
function productList(data) {
  let renderProductListStr = "";
  data.forEach((v) => {
    renderProductListStr += `<li class="productCard">
    <h4 class="productType">新品</h4>
    <img src="${v.images}"
        alt="">
    <a href="#" class="addCardBtn" data-id="${v.id}">加入購物車</a>
    <h3>${v.title}</h3>
    <del class="originPrice">NT$${v["origin_price"]}</del>
    <p class="nowPrice">NT$${v.price}</p>
</li>`;
  });
  productWrap.innerHTML = renderProductListStr;
}
// 取得購物車列表 fn
function customerProductCartList(data) {
  let renderCustomerProductCartListStr = `<tr>
  <th width="40%">品項</th>
  <th width="15%">單價</th>
  <th width="15%">數量</th>
  <th width="15%">金額</th>
  <th width="15%"></th>
</tr>`;
  let renderCustomerProductCartListTotalPrice = 0;

  data.forEach((v) => {
    renderCustomerProductCartListTotalPrice += v.product.price;
    renderCustomerProductCartListStr += `<tr>
    <td>
        <div class="cardItem-title">
            <img src="${v.product.images}" alt="">
            <p>${v.product.title}</p>
        </div>
    </td>
    <td>NT$${v.product.price}</td>
    <td>${v.quantity}</td>
    <td>NT$${v.product.price * v.quantity}</td>
    <td class="discardBtn">
        <a href="#" class="material-icons" data-id="${v.id}">
            clear
        </a>
    </td>
</tr>`;
  });

  if (data.length === 0) {
    shoppingCartTable.innerHTML = renderCustomerProductCartListStr;
  } else {
    shoppingCartTable.innerHTML =
      renderCustomerProductCartListStr +
      deleteAllCartListBtn(renderCustomerProductCartListTotalPrice);
  }
}
// 取得清除購物車內全部產品按鈕 fn
function deleteAllCartListBtn(price) {
  let renderCustomerProductCartListTotalStr = `<tr>
  <td>
    <a href="#" class="discardAllBtn">刪除所有品項</a>
  </td>
  <td></td>
  <td></td>
  <td>
    <p>總金額</p>
  </td>
  <td>NT$${price}</td>
  </tr>`;
  return renderCustomerProductCartListTotalStr;
}
// 篩選 fn
function productSelectFilter(e, data) {
  let renderProductSelectFilterStr = "";
  data.forEach((v) => {
    if (e.target.value === v.category) {
      renderProductSelectFilterStr += `<li class="productCard">
          <h4 class="productType">新品</h4>
          <img src="${v.images}"
              alt="">
          <a href="#" class="addCardBtn" data-id="${v.id}">加入購物車</a>
          <h3>${v.title}</h3>
          <del class="originPrice">NT$${v["origin_price"]}</del>
          <p class="nowPrice">NT$${v.price}</p>
      </li>`;
    } else if (e.target.value === "全部") {
      renderProductSelectFilterStr += `<li class="productCard">
          <h4 class="productType">新品</h4>
          <img src="${v.images}"
              alt="">
          <a href="#" class="addCardBtn">加入購物車</a>
          <h3>${v.title}</h3>
          <del class="originPrice">NT$${v["origin_price"]}</del>
          <p class="nowPrice">NT$${v.price}</p>
      </li>`;
    }
  });
  productWrap.innerHTML = renderProductSelectFilterStr;
}
// form Err render fn & form input 監聽
let renderFormErr = function () {
  let customerOrderData = {};
  orderInfoInputWrap.forEach((v) => {
    v.addEventListener("change", (e) => {
      customerOrderData[e.target.getAttribute("name")] = e.target.value;
      let err = validate(customerOrderData, constraints);
      if (err) {
        Object.keys(err).forEach((v, i) => {
          orderInfoMessage.forEach((item) => {
            if (item.getAttribute("data-message") === v) {
              item.textContent = err[v];
            } else if (!err[item.getAttribute("data-message")]) {
              item.textContent = "";
            }
          });
        });
      } else {
        orderInfoMessage.forEach((item) => {
          item.textContent = "";
        });
      }
    });
  });
};
// 取得客戶聯絡資料
function getCustomerContactInformation() {
  orderInfoInput.forEach((v) => {
    v.addEventListener("change", (e) => {
      if (e.target.getAttribute("name") === "姓名") {
        customerContactInformation["name"] = e.target.value;
      } else if (e.target.getAttribute("name") === "電話") {
        customerContactInformation["tel"] = e.target.value;
      } else if (e.target.getAttribute("name") === "Email") {
        customerContactInformation["email"] = e.target.value;
      } else if (e.target.getAttribute("name") === "寄送地址") {
        customerContactInformation["address"] = e.target.value;
      } else if (e.target.getAttribute("name") === "交易方式") {
        customerContactInformation["payment"] = e.target.value;
      }
    });
  });
  return customerContactInformation;
}

// -----------------------------------------------------------
// 呼叫
getProductList(); // 產品列表
getCartList(); // 購物車列表
renderFormErr(); // form Err render fn & form input 監聽
getCustomerContactInformation(); // 取得客戶聯絡資料
