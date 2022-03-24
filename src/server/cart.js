const add = (cart, req) => {
  cart.contents.push(req.body);
  cart = setAmountAndCount(cart);
  return JSON.stringify(cart, null, 4);
};

const change_add = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  cart = setAmountAndCount(cart);
  return JSON.stringify(cart, null, 4);
};

const change = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  find.quantity = req.body.quantity;
  cart = setAmountAndCount(cart);
  return JSON.stringify(cart, null, 4);
};

const del = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  if (find.quantity == 1 || req.body.quantity == 0){
    cart.contents.splice(cart.contents.indexOf(find), 1);
    cart = setAmountAndCount(cart);
  }
  else{
    find.quantity += req.body.quantity;
    cart = setAmountAndCount(cart);
  }
  return JSON.stringify(cart, null, 4);
};

const setAmountAndCount = (cart) => {
  let amount = 0;
  let count = 0;
  cart.contents.forEach(element => {
    amount += element.quantity * parseFloat(element.price)
    count += element.quantity;
  });
  cart.countGoods = count;
  cart.amount = amount;
  return cart
}

module.exports = {
  add,
  change_add,
  del,
  change,
};
