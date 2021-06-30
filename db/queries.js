const pool = require('./pool.js');

const getStyles = (id) => {
  const query = `
    SELECT styles.id, styles.product_id, styles.name,
      styles.sale_price, styles.original_price, styles.default_style,
      photos.url, photos.thumbnail_url, photos.id as photosId,
      skus.id as skusId, skus.size, skus.quantity
    FROM
      styles
    FULL JOIN
      photos ON styles.id = photos.style_id
    FULL JOIN
      skus ON styles.id = skus.style_id
    WHERE styles.product_id = $1;`;
  var value = [id];
  var finObj = {
    product_id: id.toString(),
    results: []
  };
  return pool.connect()
    .then(client => {
      return client.query(query, value).then(res => {
        client.release();
        // console.log('Im working?');
        var stylesSorted = {};
        //console.log('Basic res: ', res.rows);
        for (var i = 0; i < res.rows.length; i++) {
          if (stylesSorted[res.rows[i].id]) {
            stylesSorted[res.rows[i].id].push(res.rows[i]);
          } else {
            stylesSorted[res.rows[i].id] = [res.rows[i]];
          }
        }
        for (var key in stylesSorted) {
          var entry = stylesSorted[key][0]
          var salePrice = entry.sale_price === 'null' ? "0" : entry.sale_price.toString();
          var styleObj = {
            "style_id": entry.id,
            "name": entry.name,
            "original_price": entry.original_price.toString(),
            "sale_price": salePrice,
            "default?": entry.default_style === 1 ? true : false,
            "photos": [],
            "skus": {}
          };
          var startPhotoId = entry.photosid;
          var i = 0;
          while (stylesSorted[key][i].photosid === startPhotoId) {
            var innerEntry = stylesSorted[key][i];
            var skuObj = {
              "quantity": innerEntry.quantity,
              "size": innerEntry.size
            };
            styleObj.skus[innerEntry.skusid] = skuObj;
            i++
          }
          for (var j = 0; j < stylesSorted[key].length; j+=i) {
            var innerEntry = stylesSorted[key][j];
            var photoObj = {
              "thumbnail_url": innerEntry.thumbnail_url,
              "url": innerEntry.url
            };
            styleObj.photos.push(photoObj);
          }
          finObj.results.push(styleObj);
        }
        return res.rows;
      })
    }).catch(err => console.log('err: ', err));
};

const getProduct = (id) => {
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
  return pool.connect()
    .then(client => {
      return client.query(query, value).then(res => {
        client.release();
        var features = [];
        var baseObj = {};
        var firstRes = res.rows[0];
        baseObj['id'] = firstRes.id;
        baseObj['slogan'] = firstRes.name;
        baseObj['description'] = firstRes.description;
        baseObj['category'] = firstRes.category;
        baseObj['default_price'] = firstRes.default_price.toString();
        for (var i = 0; i < res.rows.length; i++) {
          var featObject = {
            feature: res.rows[i].feature,
            value: res.rows[i].value
          }
          features.push(featObject);
        }
        baseObj['features'] = features;

        return baseObj;
      })
    })
};

const getRelated = (id) => {
  const query = `
  SELECT
    related_id
  FROM
    related
  WHERE
    product_id = $1;`;
  var value = [id];
  return pool.connect()
  .then(client => {
    return client.query(query, value).then(res => {
      client.release();

      var related = [];
      for (var i = 0; i < res.rows.length; i++) {
        related.push(res.rows[i].related_id);
      }

      return related;
    })
    .catch(err => console.log(err));
  })
}


exports.getRelated = getRelated;
exports.getStyles = getStyles;
exports.getProduct = getProduct;