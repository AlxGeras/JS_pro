const fs = require('fs');

const actionDesc = {
  add: 'Добавлен', 
  change : 'Добавлен',
  del: 'Удален',
}

const idAtActions = {
  add: (req) => req.body.id_product,
  change: (req) => req.params.id,
  del: (req) =>  req.params.id,
};

const changeStat = (req, action) => {
  fs.readFile('./server/db/stat.json',(err, data) => {
    if (err) {
      console.log(err);
    } else {
      fs.readFile('./server/db/products.json', (err_, data_) => {
        if (err_){
          console.log(err);
        }
        else {
          const item =  JSON.parse(data_).find(el => el.id_product === +idAtActions[action](req))
          const statList = JSON.parse(data);
          const statObj = {};
          statObj[action] =  `${actionDesc[action]} товар id: ${item.id_product} Наименование: ${item.product_name} Цена: ${item.price} Время ${Date()}`
          statList.push(statObj);
         fs.writeFile('./server/db/stat.json', JSON.stringify(statList, null, 4), (err) => {
            if (err) console.log(err);
          })
        }
      })
    }
  })
}
      


module.exports = changeStat;