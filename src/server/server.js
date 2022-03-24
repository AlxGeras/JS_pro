const express = require('express');
const fs = require('fs');
const cartRouter = require('./cartRouter');
const app = express();
const path = require('path');

app.use(express.json());
app.use('/', express.static(path.resolve(__dirname, '../public')));
app.use('/api/cart', cartRouter);

const catalogJSONPath = path.resolve(__dirname, './db/products.json');
const productJSONPath = path.resolve(__dirname, './db/productShow.json');


app.get('/api/products', (req, res) => {
  fs.readFile(catalogJSONPath, 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify({result: 0, text: err}));
      // res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

app.get('/api/product', (req, res) => {
  fs.readFile(productJSONPath, 'utf-8', (err, data) => {
      if (err) {
          res.send(JSON.stringify({ result: 0, text: err }));
      } else {
          res.send(data);
      }
  });
});

// ID товара, страницу, которого надо показать
app.post('/api/product/show', (req, res) => {
  fs.readFile(productJSONPath, 'utf-8', (err, data) => {
      if (err) {
          res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
      } else {
        
          // парсим текущий json с id
          const good = JSON.parse(data);
          good.content = [req.body];
          // пишем обратно
          fs.writeFile(productJSONPath, JSON.stringify(good, null, 4), (err) => {
              if (err) {
                  res.send('{"result": 0}');
              } else {
                  res.send('{"result": 1}');
              }
          })
      }
  });
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening ${port} port`);
});

// app.get(); // READ
// app.post(); // CREATE
// app.put(); // UPDATE
// app.delete(); // DELETE
