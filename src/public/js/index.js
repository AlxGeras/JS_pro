import cart from "./CartComp.js"
import products from "./ProducComp.js"
import cart_total from "./CartTotal.js"
import description from "./DescriptionOfProduct.js"
import error from "./ErrorComp.js"
import filter_el from "./FilterComp.js"
import shop_cart from "./ShopCartComp.js"
import sidebar from "./SideBarComp.js"


const app = new Vue({
    el: '#app',
    components: {
        cart,
        products,
        cart_total,
        description,
        error,
        filter_el,
        shop_cart,
        sidebar

    },
    data: {
        userSearch: '',
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(error => {
                  this.$refs.error.setError(error);
              });
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(error => {
                  this.$refs.error.setError(error);
              });
        },
        deleteJson(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(error => {
                  this.$refs.error.setError(error);
              });
        },
    },
    mounted() {
        console.log(this);
    }
});

