// api
const apiPath = "2023autumnhexschoolweek09ann328";
const token = "BBOYCmw9gXax22kPIGHoqCpRU802";
const customerApiUrl = `https://livejs-api.hexschool.io/api/livejs/v1/customer/${apiPath}`;

// -----------------------------------------------------------
// Dom
const productWrap = document.querySelector(".productWrap");
const productSelect = document.querySelector(".productSelect");
const addCardBtn = document.querySelectorAll(".addCardBtn");
const shoppingCartTable = document.querySelector(".shoppingCart-table");
const discardBtn = document.querySelectorAll(".discardBtn");

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
      CustomerProductCartList(data);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
}
// 刪除購物車內特定產品 btn監聽 & api
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
      CustomerProductCartList(data);
    })
    .catch(function (error) {
      console.log(error.response.data);
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
function CustomerProductCartList(data) {
  let renderCustomerProductCartListStr = `<tr>
  <th width="40%">品項</th>
  <th width="15%">單價</th>
  <th width="15%">數量</th>
  <th width="15%">金額</th>
  <th width="15%"></th>
</tr>`;
  data.forEach((v) => {
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
  shoppingCartTable.innerHTML = renderCustomerProductCartListStr;
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

// -----------------------------------------------------------
// 呼叫
getProductList(); // 產品列表
getCartList(); // 購物車列表
