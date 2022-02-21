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

class ProductList {
  constructor(container = '.products') {
    this._container = document.querySelector(container);
    this._goods = [];
    this._allProducts = [];
    this._goodsInBasket = {};
    this._basketEl = document.querySelector('.basket');
    this._btnCartEl = document.querySelector('.btn-cart');
    this._basketTotalValueEl = document.querySelector('.basketTotalValue');
    this._basketTotalEl = document.querySelector('.basketTotal');
    this._btnCartEl.addEventListener('click', () => {
      this._basketEl.classList.toggle('hidden');
    });

    this.getProducts()
      .then((data) => {
        this._goods = data;
        this._render();
      });

    this.getBasket()
      .then((data) => {
        data.contents
          .forEach((el) => {
            this.addToCartFromHistory(el.id_product, el.product_name, el.price, el.quantity);
          })
      })
      ;

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
      this.addToCart(id, name, price);
    });

    this._basketEl.addEventListener('click', event => {
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
      this.deleteFromCart(id);
    });

  }

  /**
   * Функция возвращает объект содержащий информацию о товарах корзины.
   *  @return {object} - объект содержащий объекты с информацией о товарах корзины.
   */
  getGoodsInBasket() {
    return this._goodsInBasket;
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
        // Если такого продукта еще не было добавлено в наш объект, который хранит
        // все добавленные товары, то создаем новый объект.
        if (!(id in this._goodsInBasket)) {
          this._goodsInBasket[id] = { id: id, name: name, price: price, count: 0 };
        }
        // Добавляем в количество +1 к продукту.
        this._goodsInBasket[id].count++;
        // Ставим новую общую стоимость товаров в корзине.
        this._basketTotalValueEl.textContent = this.getTotalBasketPrice().toFixed(2);
        // Отрисовываем продукт с данным id.
        this.renderProductInBasket(id);
      }
    });

  }


  /**
  * Функция добавляет продукт в корзину из истории покупок.
  * @param {number} id - Id продукта.
  * @param {string} name - Название продукта.
  * @param {number} price - Цена продукта.
  */
  addToCartFromHistory(id, name, price, count) {
    this._goodsInBasket[id] = { id: id, name: name, price: price, count: count };
    // Ставим новую общую стоимость товаров в корзине.
    this._basketTotalValueEl.textContent = this.getTotalBasketPrice().toFixed(2);
    // Отрисовываем продукт с данным id.
    this.renderProductInBasket(id);
  }

  /**
  * Функция удаляет продукт из корзины.
  * @param {number} id - Id продукта.
  */
  deleteFromCart(id) {
    this.getPossibleToDeleteFromBasket().then((data) => {
      if (data.result === 1) {
        this._goodsInBasket[id].count = 0;
        const basketRowEl = this._basketEl
          .querySelector(`.basketRow[data-id="${id}"]`);
        basketRowEl.remove();

        // Ставим новую общую стоимость товаров в корзине.
        this._basketTotalValueEl.textContent = this.getTotalBasketPrice().toFixed(2);
      }
    });

  }

  getTotalBasketPrice() {
    return Object
      .values(this._goodsInBasket)
      .reduce((acc, product) => acc + product.price * product.count, 0);
  }

  /**
   * Отрисовывает в корзину информацию о продукте.
   * @param {number} productId - Id продукта.
   */
  renderProductInBasket(productId) {
    // Получаем строку в корзине, которая отвечает за данный продукт.
    const basketRowEl = this._basketEl
      .querySelector(`.basketRow[data-id="${productId}"]`);
    // Если такой строки нет, то отрисовываем новую строку.
    if (!basketRowEl) {
      this.renderNewProductInBasket(productId);
      return;
    }

    // Получаем данные о продукте из объекта корзины, где хранятся данные о всех
    // добавленных продуктах.
    const product = this._goodsInBasket[productId];
    // Ставим новое количество в строке продукта корзины.
    basketRowEl.querySelector('.productCount').textContent = product.count;
    // Ставим нужную итоговую цену по данному продукту в строке продукта корзины.
    basketRowEl
      .querySelector('.productTotalRow')
      .textContent = (product.price * product.count).toFixed(2);
  }

  /**
   * Функция отрисовывает новый товар в корзине.
   * @param {number} productId - Id товара.
   */
  renderNewProductInBasket(productId) {
    const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${this._goodsInBasket[productId].name}</div>
      <div>
        <span class="productCount">${this._goodsInBasket[productId].count}</span> шт.
      </div>
      <div>$${this._goodsInBasket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(this._goodsInBasket[productId].price * this._goodsInBasket[productId].count).toFixed(2)}</span>
      </div>
      <div>
          <i class="fa-solid fa-trash-can"></i>
      </div>
    </div>
    `;
    this._basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
  }

  getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then((response) => response.json())
      .catch((err) => console.log(err));
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

  _render() {
    console.log('rendering data...');
    for (const product of this._goods) {
      const productObject = new ProductItem(product);

      this._allProducts.push(productObject);
      this._container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    }
  }
}

class ProductItem {
  constructor(product, img = 'https://via.placeholder.com/200x150') {
    this.id = product.id_product;
    this.title = product.product_name;
    this.price = product.price;
    this.img = img;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

const productList = new ProductList();
