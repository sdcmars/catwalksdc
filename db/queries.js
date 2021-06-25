const pool = require('./pool.js');

const getProduct = (id) => {
  console.log('Product running');
  const query = `SELECT id, name, slogan, description, category, default_price FROM products WHERE
  id = $1;`;
  const featureQuery = `SELECT feature, value FROM features WHERE product_id = $2`;
  var value = [id];
  var returnObj = {};
  return pool.connect()
    .then(client => {
      return client.query(query, value)
        .then(res => {
          console.log('Res!: ', res);
          console.log('Res rows: ', res.rows);
          return res.rows;
          // return new Promise((resolve, reject) => {
          //   resolve(res.rows);
          // })
          //client.release();
        }).catch(err => {
          //client.release();
          console.log('Err: ', err);
        })
    })
}

// const getStyle = (id) => {


// }

















exports.getProduct = getProduct;