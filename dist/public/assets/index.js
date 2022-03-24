import cart from "./CartComp.js";
import products from "./ProducComp.js";
import cart_total from "./CartTotal.js";
import description from "./DescriptionOfProduct.js";
import error from "./ErrorComp.js";
import filter_el from "./FilterComp.js";
import shop_cart from "./ShopCartComp.js";
import sidebar from "./SideBarComp.js";
var app = new Vue({
  el: '#app',
  components: {
    cart: cart,
    products: products,
    cart_total: cart_total,
    description: description,
    error: error,
    filter_el: filter_el,
    shop_cart: shop_cart,
    sidebar: sidebar
  },
  data: {
    userSearch: ''
  },
  methods: {
    getJson: function getJson(url) {
      var _this = this;

      return fetch(url).then(function (result) {
        return result.json();
      })["catch"](function (error) {
        _this.$refs.error.setError(error);
      });
    },
    postJson: function postJson(url, data) {
      var _this2 = this;

      return fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(function (result) {
        return result.json();
      })["catch"](function (error) {
        _this2.$refs.error.setError(error);
      });
    },
    putJson: function putJson(url, data) {
      var _this3 = this;

      return fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(function (result) {
        return result.json();
      })["catch"](function (error) {
        _this3.$refs.error.setError(error);
      });
    },
    deleteJson: function deleteJson(url, data) {
      var _this4 = this;

      return fetch(url, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(function (result) {
        return result.json();
      })["catch"](function (error) {
        _this4.$refs.error.setError(error);
      });
    }
  },
  mounted: function mounted() {
    console.log(this);
  }
});