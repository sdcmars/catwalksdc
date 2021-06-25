const fs = require('fs');
const path = require('path');
const pool = require('../db/pool.js');
const copyFrom = require('pg-copy-streams').from;

const fileNameSkus = 'skus.csv';
const filePathSkus = path.join(__dirname, '../sdcfiles/', fileNameSkus);
const copyCommandSkus = `COPY skus from STDIN WITH DELIMITER ',' CSV HEADER`;

const fileNamePhotos = 'photos.csv';
const filePathPhotos = path.join(__dirname, '../sdcfiles/', fileNamePhotos);
const copyCommandPhotos = `COPY photos from STDIN WITH DELIMITER ',' CSV HEADER`;

const fileNameProducts = 'products.csv';
const filePathProducts = path.join(__dirname, '../sdcfiles/', fileNameProducts);
const copyCommandProducts = `COPY products from STDIN WITH DELIMITER ',' CSV HEADER`;

const fileNameStyles = 'styles.csv';
const filePathStyles = path.join(__dirname, '../sdcfiles/', fileNameStyles);
const copyCommandStyles = `COPY styles from STDIN WITH DELIMITER ',' CSV HEADER`;

const fileNameRelated = 'related.csv';
const filePathRelated = path.join(__dirname, '../sdcfiles/', fileNameRelated);
const copyCommandRelated = `COPY related from STDIN WITH DELIMITER ',' CSV HEADER`;

const fileNameFeatures = 'features.csv';
const filePathFeatures = path.join(__dirname, '../sdcfiles/', fileNameFeatures);
const copyCommandFeatures = `COPY features from STDIN WITH DELIMITER ',' CSV HEADER`;

const cleanup = () => {
  pool.end();
  console.log('Clean up done!');
  process.exit();
}

pool.connect(function(err, client, done) {
  console.log('dogs!');
  if (err) {
    console.log('pool connect error: ', err);
    return;
  }

  var stream = client.query(copyFrom(copyCommandFeatures));
  var fileStream = fs.createReadStream(filePathFeatures);

  fileStream.on('error', (err) => {
    console.log('filestream error: ', err);
    cleanup();
  });

  stream.on('error', (err) => {
    console.log('stream error: ', err);
    cleanup();
  });

  stream.on('end', () => {
    console.log('complete');
    cleanup();
  });

  fileStream.pipe(stream);
})


// const stream = fs.createReadStream(filePath, {encoding: 'utf8'});

// let lineRemainder = '';
// stream.on('data', (chunk) => {
//   stream.pause();
//   let lines = chunk.split('\n');
//   lines[0] = lineRemainder + lines[0];
//   lineRemainder = lines.pop();
//   lines.forEach((line) => {
//     var newLine = line.split(',');
//     var id = newLine[0];
//     var style_id = newLine[1];
//     var size = newLine[2];
//     var quantity = newLine[3];

//     // console.log('thumbnail_url: ', thumbnail_url);
//     // console.log('Full line: ', id, style_id, url, thumbnail_url);
//     pool.query('INSERT INTO skus (id, style_id, size, quantity) VALUES($1, $2, $3, $4)', [parseInt(id), parseInt(style_id), size, parseInt(quantity)]).catch((err) => {
//       //console.log(line);
//     });
//   });
//   stream.resume();
// });

// stream.on('end', () => {
//   console.log('dog');
// });