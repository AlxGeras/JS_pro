'use strict';

class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.topping = {};

        this.choiceOfSize = {
            'little': { price: 50, calories: 20 },
            'big': { price: 100, calories: 40 },
        }

        this.choiceOfStuffing = {
            'cheese': { price: 10, calories: 20 },
            'salad': { price: 20, calories: 5 },
            'potato': { price: 15, calories: 10 },
        }

        this.choiceOfToppings = {
            'mayonnaise': { price: 15, calories: 0 },
            'seasoning': { price: 20, calories: 5 },
        }
    }

    /**
     * Функция добавляет добавку в бургер.
     * @param {String} topping - наименование добавки 
     * допустимые значения: 'mayonnaise', 'seasoning'.
     */
    addTopping(topping) {
        if (!(topping in this.topping)) {
            this.topping[topping] = { count: 0 };
        }
        this.topping[topping].count++;
    }

    /**
     * Функция удаляет добавку из бургера.
     * @param {String} topping - наименование добавки 
     * допустимые значения: 'mayonnaise', 'seasoning'.
     */
    removeTopping(topping) {
        if (!(topping in this.topping)) {
            console.error('Нельзя удалить добавку если ее нет в составе бургера');
            return;
        }
        if (this.topping[topping].count === 1) {
            delete this.topping[topping];
            return;
        }
        if (this.topping[topping].count > 1) {
            this.topping[topping].count--;
        }
    }

    /**
     * Функция позволяет получить список добавок бургера.
     * @return {Object} - Объект, ключачи которого являюся 
     * наименования добавки, а значения их количество
     */
    getToppings() {
        return this.topping;
    }

    /**
     * Функция позволяет получить размер бургера.
     * @return {String} - Размер бургера 
     */
    getSize() {
        return this.size;
    }

    /**
     * Функция позволяет получить начинку бургера.
     * @return {String} - Начинка бургера 
     */
    getStuffing() {
        return this.stuffing;
    }
    /**
     * Функция позволяет получить стоимость бургера.
     * @return {Number} - Стоимость бургера 
     */
    calculatePrice() {
        let price = 0;
        price += this.choiceOfSize[this.size].price;
        price += this.choiceOfStuffing[this.stuffing].price;
        Object.keys(this.topping).forEach(el => price += this.topping[el].count * this.choiceOfToppings[el].price);
        return price;
    }

    /**
     * Функция позволяет получить калорийность бургера.
     * @return {Number} - Калорийность бургера 
     */
    calculateCalories() {
        let calories = 0;
        calories += this.choiceOfSize[this.size].calories;
        calories += this.choiceOfStuffing[this.stuffing].calories;
        Object.keys(this.topping).forEach(el => calories += this.topping[el].count * this.choiceOfToppings[el].calories);
        return calories;
    }
}

const myBurger = new Hamburger('big', 'salad');

myBurger.addTopping('mayonnaise');
myBurger.addTopping('mayonnaise');
myBurger.addTopping('mayonnaise');
myBurger.addTopping('seasoning');
myBurger.addTopping('seasoning');
myBurger.removeTopping('mayonnaise');

console.log(myBurger);
console.log(myBurger.getToppings());
console.log(myBurger.getSize());
console.log(myBurger.getStuffing());
console.log(myBurger.calculatePrice());
console.log(myBurger.calculateCalories());


