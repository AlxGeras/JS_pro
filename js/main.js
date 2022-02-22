'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// только для первого задания! Далее не использовать в классах каталога и корзины!!!
// Не использовать fetch
/*
let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error');
      } else {
        cb(xhr.responseText);
      }
    }
  };

  xhr.send();
};
*/

let getRequest = (url, cb) => {

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject('Error');
          console.log('Error');
        } else {
          resolve(cb(xhr.responseText));
        }
      }
    }
    xhr.send();
  });
};

class List {
  constructor(container, list = listContext) {
    this.container = container;
    this._goods = [];
    this.list = list;
    this.allProducts = [];
  }


  /**
   * обработка полученных данных
   * @param data
   */
  handleData(data) {
    this._goods = data;
    this._render();
  }

  _render() {
    const block = document.querySelector(this.container);
    console.log('rendering data...');
    for (const product of this._goods) {
      const productObj = new this.list[this.constructor.name](product);
      this.allProducts.push(productObj);
      block.insertAdjacentHTML(productObj.position, productObj.render());
    }
  }
}



class ProductList extends List {
  constructor(cart, container = '.products') {
    super(container)
    this.cart = cart;
    this._container = document.querySelector(container);
    this.getProducts().then(data => this.handleData(data));
    this.init();
    console.log(this);

  }

  init() {
    this._container.addEventListener('click', event => {
      // Проверяем, если клик был не по кнопке с селектором ".buy-btn", а также
      // такого селектора не существует среди родителей элемента, по которому был
      // произведен клик, то ничего не делаем, уходим из функции.
      if (!event.target.closest('.buy-btn')) {
        return;
      }
      // Получаем ближайшего родителя с классом product-item, в нем записаны все
      // нужные данные о продукте, получаем эти данные.
      const productItemEl = event.target.closest('.product-item');
      const id = +productItemEl.dataset.id;
      const name = this._goods.find(productItem => productItem.id_product === id).product_name;
      const price = this._goods.find(productItem => productItem.id_product === id).price;
      // Добавляем в корзину продукт.
      cart.addToCart(id, name, price);
    });
    cart._basketEl.addEventListener('click', event => {
      // Проверяем, если клик был не по кнопке с селектором ".fa-trash-can", а также
      // такого селектора не существует среди родителей элемента, по которому был
      // произведен клик, то ничего не делаем, уходим из функции.
      if (!event.target.closest('.fa-trash-can')) {
        return;
      }
      // Получаем ближайшего родителя с классом basketRow, в нем записаны все
      // нужные данные о продукте, получаем эти данные.
      const productItemEl = event.target.closest('.basketRow');
      const id = +productItemEl.dataset.id;
      // Удаляем продукт из корзины.
      cart.deleteFromCart(id);
    });
  }

  /**
   * Функция возвращает объект содержащий информацию о товарах корзины.
   *  @return {object} - объект содержащий объекты с информацией о товарах корзины.
   */
  getGoodsInBasket() {
    return this._goodsInBasket;
  }

  getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  }

}


class Cart extends List {
  constructor(container = '.basketTotal') {
    super(container)
    this._basketEl = document.querySelector('.basket');
    this._goodsInBasket = [];
    this._basketTotalValueEl = document.querySelector('.basketTotalValue');
    this._basketTotalEl = document.querySelector('.basketTotal');
    this.getBasket().then(data => this.handleData(data.contents));
    this.init();
  }

  init() {
    document.querySelector('.btn-cart').addEventListener('click', () => {
      this._basketEl.classList.toggle('hidden');
      this._basketTotalValueEl.textContent = this.getTotalBasketPrice().toFixed(2)
    })
  }

  /**
  * Функция добавляет продукт в корзину.
  * @param {number} id - Id продукта.
  * @param {string} name - Название продукта.
  * @param {number} price - Цена продукта.
  */
  addToCart(id, name, price) {
    this.getPossibleToAddBasket().then((data) => {
      if (data.result === 1) {
        if ((this.allProducts.find(el => el.id_product === id))) {
          this.allProducts.find(el => el.id_product === id).quantity++;
        }
        // Ставим новую общую стоимость товаров в корзине.
        this._basketTotalValueEl.textContent = this.getTotalBasketPrice().toFixed(2);
        // Отрисовываем продукт с данным id.
        this.renderProductInBasket(id, name, price);
      }
    });

  }

  /**
  * Функция удаляет продукт из корзины.
  * @param {number} id - Id продукта.
  */
  deleteFromCart(id) {
    this.getPossibleToDeleteFromBasket().then((data) => {
      if (data.result === 1) {
        let find = this.allProducts.find(product => product.id_product === id);
        this.allProducts.splice(this.allProducts.indexOf(find), 1);
        const basketRowEl = this._basketEl
          .querySelector(`.basketRow[data-id="${id}"]`);
        basketRowEl.remove();
        // Ставим новую общую стоимость товаров в корзине.
        this._basketTotalValueEl.textContent = this.getTotalBasketPrice().toFixed(2);
      }
    });

  }

  /**
 * Отрисовывает в корзину информацию о продукте.
 * @param {number} productId - Id продукта.
 */
  renderProductInBasket(id, name, price) {
    // Получаем строку в корзине, которая отвечает за данный продукт.
    const basketRowEl = this._basketEl
      .querySelector(`.basketRow[data-id="${id}"]`);
    // Если такой строки нет, то отрисовываем новую строку.
    if (!basketRowEl) {
      let productEL = {
        id_product: id,
        price: price,
        product_name: name,
        quantity: 1
      };
      this._goods = [productEL];
      this._render();
      return;
    }

    // Получаем данные о продукте из объекта корзины, где хранятся данные о всех
    // добавленных продуктах.
    const product = this.allProducts.find(el => el.id_product === id);
    // Ставим новое количество в строке продукта корзины.
    basketRowEl.querySelector('.productQuantity').textContent = product.quantity;
    // Ставим нужную итоговую цену по данному продукту в строке продукта корзины.
    basketRowEl
      .querySelector('.productTotalRow')
      .textContent = (product.price * product.quantity).toFixed(2);
  }


  getTotalBasketPrice() {
    return this.allProducts
      .reduce((acc, product) => acc + product.price * product.quantity, 0);
  }

  getBasket() {
    return fetch(`${API}/getBasket.json`)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  }

  getPossibleToAddBasket() {
    return fetch(`${API}/addToBasket.json`)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  }

  getPossibleToDeleteFromBasket() {
    return fetch(`${API}/deleteFromBasket.json`)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  }

}

class Item {
  constructor(el, img = 'https://via.placeholder.com/200x150') {
    this.product_name = el.product_name;
    this.price = el.price;
    this.id_product = el.id_product;
    this.img = img;
    this.position = 'beforeend';
  }
  render() {
    return ``;
  }
}

class ProductItem extends Item {
  render() {
    return `<div class="product-item" data-id="${this.id_product}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.product_name}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

class CartItem extends Item {
  constructor(el, img = 'https://via.placeholder.com/50x100') {
    super(el, img);
    this.quantity = el.quantity;
    this.position = 'beforebegin';
  }
  /**
   * Функция отрисовывает новый товар в корзине.
   * @param {number} productId - Id товара.
   */
  render() {

    return `
      <div class="basketRow" data-id="${this.id_product}">
        <div>${this.product_name}</div>
        <div>
          <span class="productQuantity">${this.quantity}</span> шт.
        </div>
        <div>$${this.price}</div>
        <div>
          $<span class="productTotalRow">${(this.price *
        this.quantity).toFixed(2)}</span>
        </div>
        <div>
            <i class="fa-solid fa-trash-can"></i>
        </div>
      </div>
      `;
  }
}



const listContext = {
  ProductList: ProductItem,
  Cart: CartItem,
};

const cart = new Cart();
const productList = new ProductList(cart);
