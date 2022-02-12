const products = [
  { id: 1, title: 'Notebook', price: 1000, imgURL: "https://picsum.photos/id/10/200/300" },
  { id: 2, title: 'Mouse', price: 100, imgURL: "https://picsum.photos/id/100/200/300" },
  { id: 3, title: 'Keyboard', price: 250, imgURL: "https://picsum.photos/id/1000/200/300" },
  { id: 4, title: 'Gamepad', price: 150 },
];

const renderProduct = (title, price, imgURL = 'img/not-found.png') => {
  return `<div class="product-item">
            <h3>${title}</h3>
            <p>${price}</p>
            <img src="${imgURL}" alt="image">
            <button class="by-btn">Добавить</button>
          </div>`;
};

//  list имеет структуру массива [{…}, {…}, {…}, {…}], соответственно если в лоб вставить 
// массив в html-структуру то появятся запятые 

//Исходный код
/*
const renderProducts = list => {
  const productList = list.map(item => renderProduct(item.title, item.price, item.imgURL));
  console.log(productList);
  document.querySelector('.products').innerHTML = productList;
};
*/

// Запись в одну строчку, но это для примера, и лучше так не писать
//products.forEach(item => document.querySelector('.products').insertAdjacentHTML("beforeend", renderProduct(item.title, item.price, item.imgURL)));

const productsEl = document.querySelector('.products');
let productsHTML = '';
products.forEach(item => productsHTML += renderProduct(item.title, item.price, item.imgURL));
productsEl.innerHTML = productsHTML;



