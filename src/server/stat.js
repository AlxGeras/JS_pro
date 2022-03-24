const fs = require('fs');
const path = require('path');

const actionDesc = {
  add: 'Добавлен', 
  change : 'Добавлен',
  del: 'Удален',
}

const idAtActions = {
  add: (req) => req.body.id_product,
  change: (req) => req.params.id,
  del: (req) =>  req.params.id,
  change_add: (req) =>  req.params.id,
};

const statsJSON = path.resolve(__dirname, './db/stat.json');
const catalogJSONPath = path.resolve(__dirname, './db/products.json');

const changeStat = (req, action) => {
  fs.readFile(statsJSON,(err, data) => {
    if (err) {
      console.log(err);
    } else {
      fs.readFile(catalogJSONPath, (err_, data_) => {
        if (err_){
          console.log(err);
        }
        else {
          const item =  JSON.parse(data_).find(el => el.id_product === +idAtActions[action](req))
          const statList = JSON.parse(data);
          const statObj = {};
          statObj[action] =  `${actionDesc[action]} товар id: ${item.id_product} Наименование: ${item.product_name} Цена: ${item.price} Время ${Date()}`
          statList.push(statObj);
         fs.writeFile(statsJSON, JSON.stringify(statList, null, 4), (err) => {
            if (err) console.log(err);
          })
        }
      })
    }
  })
}
      


module.exports = changeStat;