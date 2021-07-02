const compression = require('compression');
const express = require('express');
const app = express();
const db = require('./db/queries.js');
const url = require('url');

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(compression());

app.get('/loaderio-459be6f95a00f65f762d59f2ee0cd2d6', (req, res) => {
  res.send('loaderio-459be6f95a00f65f762d59f2ee0cd2d6');
})

app.get('/products/:product_id', (req, res) => {
  //let urlObj = url.parse(req.url, true);
  //console.log(urlObj);
  return db.getProduct(req.params.product_id)
    .then((response) => {
      res.send(response);
    })
    .catch(err => {
      console.log('Error from products: ', err);
      res.send(err);

    });
})

app.get('/products/:product_id/styles', (req, res) => {
  return db.getStyles(req.params.product_id)
    .then((response) => {
      //console.log('Response from styles query: ', response);
      res.send(response);
    })
    .catch(err => {
      res.send(err);
      console.log('ERROR: ', err);
    });
});

app.get('/products/:product_id/related', (req, res) => {
  return db.getRelated(req.params.product_id)
    .then((response) => {
      res.send(response);
    })
    .catch(err => res.send(err));
})

app.listen(port, () => {
  console.log('listening on port 3000');
});


//=========ATELIER APIS REQUESTS========

//GET /products/:product_id
//Sample data:
// "id": 1,
// "name": "Camo Onesie",
// "slogan": "Blend in to your crowd",
// "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
// "category": "Jackets",
// "default_price": "140"

// app.get('/products', (req, res) => {

// })

//GET /products/:product_id
// {
//   "id": 11,
//   "name": "Air Minis 250",
//   "slogan": "Full court support",
//   "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
//   "category": "Basketball Shoes",
//   "default_price": "0",
//   "features": [
//   {
//           "feature": "Sole",
//           "value": "Rubber"
//       },
//   {
//           "feature": "Material",
//           "value": "FullControlSkin"
//       },
//   // ...
//   ],
// }


//GET /products/:product_id/styles
// {
//   "product_id": "1",
//   "results": [
//   {
//           "style_id": 1,
//           "name": "Forest Green & Black",
//           "original_price": "140",
//           "sale_price": "0",
//           "default?": true,
//           "photos": [
//       {
//                   "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
//                   "url": "urlplaceholder/style_1_photo_number.jpg"
//               },
//       {
//                   "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
//                   "url": "urlplaceholder/style_1_photo_number.jpg"
//               }
//       // ...
//           ],
//       "skus": {
//                 "37": {
//                       "quantity": 8,
//                       "size": "XS"
//                 },
//                 "38": {
//                       "quantity": 16,
//                       "size": "S"
//                 },
//                 "39": {
//                       "quantity": 17,
//                       "size": "M"
//                 },
//           //...
//             }
//   },
// {
//       "style_id": 2,
//       "name": "Desert Brown & Tan",
//       "original_price": "140",
//       "sale_price": "0",
//       "default?": false,
//       "photos": [
//       {
//                   "thumbnail_url": "urlplaceholder/style_2_photo_number_thumbnail.jpg",
//                   "url": "urlplaceholder/style_2_photo_number.jpg"
//       }
//     // ...
//           ],
//       "skus": {
//                 "37": {
//                       "quantity": 8,
//                       "size": "XS"
//                 },
//                 "38": {
//                       "quantity": 16,
//                       "size": "S"
//                 },
//                 "39": {
//                       "quantity": 17,
//                       "size": "M"
//                 },
//           //...
//             }
//   },
// // ...
// }

//GET /products/:product_id/related
// [
//   2,
//   3,
//   8,
//   7
// ],







