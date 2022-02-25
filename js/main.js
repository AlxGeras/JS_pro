const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    filtered: [],
    catalogUrl: '/catalogData.json',
    basketUrl: '/getBasket.json',
    products: [],
    basket: [],
    imgCatalog: 'https://via.placeholder.com/200x150',
    miniImgCatalog :  'https://via.placeholder.com/50x100',
    searchLine: '',
    isVisibleCart: false,
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product) {
      this.getJson(`${API}/addToBasket.json`)
      .then(data => {
        if(data.result === 1){
          let find = this.basket.find(el => el.id_product === product.id_product);
          if(find){
            find.quantity++;
          }
          else {
            const newGood = Object.create(product);
            newGood.quantity = 1;
            this.basket.push(newGood);
          }
        } else {
          alert('Error');
        }
      })
    },
    removeProduct(product){
      this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if(data.result === 1){
            let find = this.basket.find(el => el.id_product === product.id_product);
            if(find.quantity > 1){ // если товара > 1, то уменьшаем количество на 1
              find.quantity--;
            } else { // удаляем
              this.basket.splice(this.basket.indexOf(find), 1);
            }
          } else {
            alert('Error');
          }
        })
    },
    filterGoods() {
      const regexp = new RegExp(this.searchLine, 'i');
      this.filtered = this.products.filter(product => regexp.test(product.product_name));
    },
    inFilteredGoods(product){
      return this.filtered.find(el => el.id_product === product.id_product)
    },
    showCart(){
      this.isVisibleCart = !this.isVisibleCart;
  },

  },
  beforeCreated() { },
  created() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          this.products.push(el);
        }
      });
      this.filtered = this.products;
      this.getJson(`${API + this.basketUrl}`)
      .then(data => {
        for (let el of data.contents) {
          this.basket.push(el);
        }
      });
  },
  beforeMount() { },
  mounted() { },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
});
