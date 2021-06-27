const pool = require('./pool.js');

const getStyles = (id) => {
  console.log('Styles running');
}

const getProduct = (id) => {
  console.log('Product running');
  const query = `
    SELECT
      products.id,
      products.name,
      products.slogan, products.description, products.category, products.default_price,
      features.feature, features.value
    FROM
      products
    FULL JOIN
      features ON products.id = features.product_id
    WHERE products.id = $1;`;
  // const featureQuery = `SELECT feature, value FROM features WHERE product_id = $1`;
  var value = [id];
  var returnObj = {features: []};
  return pool.connect()
    .then(client => {
      return client.query(query, value).then(res => {
        return res.rows;
      })
        // .then(res => {
        //   console.log('Res!: ', res);
        //   console.log('Res rows: ', res.rows);
        //   returnObj.a = res.rows;
        // }).catch(err => {
        //   console.log('Err: ', err);
        // })

      // var b = client.query(featureQuery, value)
      //   // .then(res => {
        //   console.log('2 res: ', res);
        //   console.log('2 res rows: ', res.rows);
        //   returnObj.features = res.rows;
        //   console.log('FINAL OBJ: ',  returnObj);
        // }).catch(err => {
        //   console.log('Err: ', err);
        // })
      // Promise.all([a, b]).then()

    })
}

// const getStyle = (id) => {


// }

















exports.getProduct = getProduct;