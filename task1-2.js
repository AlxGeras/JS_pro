'use strict';

class goodEl {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class goodsList {
    constructor() {
        this.basket = {};
    }

    /**
     * Функция добавляет продукт в корзину.
     * @param {object} goodEl - экземпляр класса товара.
     */
    addToBasket(goodEl) {
        if (!(goodEl.id in this.basket)) {
            this.basket[goodEl.id] = { id: goodEl.id, name: goodEl.name, price: goodEl.price, count: 0 };
        }
        this.basket[goodEl.id].count++;
    }

    /**
     * Функция удаляет продукт из корзины.
     * @param {object} goodEl - экземпляр класса товара.
     */
    deleteFromBasket(goodEl) {
        if (!(goodEl.id in this.basket)) {
            console.error('Нельзя удалить продукт которого нет в корзине');
            return;
        }
        if (this.basket[goodEl.id].count === 1) {
            delete this.basket[goodEl.id];
            return;
        }
        if (this.basket[goodEl.id].count > 1) {
            this.basket[goodEl.id].count--;
        }
    }

    /**
     * Считает и возвращает количество продуктов в корзине.
     * @return {number} - Количество продуктов в корзине.
     */
    getTotalBasketCount() {
        let totalCount = 0;
        Object.values(this.basket).forEach(el => totalCount += el.count);
        return totalCount;
    }
    /**
     * Считает и возвращает итоговую цену по всем добавленным продуктам.
     * @return {number} - Итоговую цену по всем добавленным продуктам.
     */
    getTotalBasketPrice() {
        let totalPrice = 0;
        Object
            .values(this.basket)
            .forEach(el => totalPrice += el.price * el.count);
        return totalPrice;
    }
}

const myGoodsList = new goodsList();

myGoodsList.addToBasket(new goodEl(1, 'Product 1', 100));
myGoodsList.addToBasket(new goodEl(2, 'Product 2', 200));
myGoodsList.addToBasket(new goodEl(3, 'Product 3', 300));
myGoodsList.addToBasket(new goodEl(1, 'Product 1', 100));
myGoodsList.addToBasket(new goodEl(1, 'Product 1', 100));
myGoodsList.deleteFromBasket(new goodEl(1, 'Product 1', 100));
console.log(myGoodsList);
console.log(myGoodsList.getTotalBasketCount());
console.log(myGoodsList.getTotalBasketPrice());

