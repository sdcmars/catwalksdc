const fs = require('fs');
const path = require('path');
const pool = require('../db.js');

const fileName = 'skus.csv';
const filePath = path.join(__dirname, '../sdcfiles/', fileName);

const stream = fs.createReadStream(filePath, {encoding: 'utf8'});

let lineRemainder = '';
stream.on('data', (chunk) => {
  stream.pause();
  let lines = chunk.split('\n');
  lines[0] = lineRemainder + lines[0];
  lineRemainder = lines.pop();
  lines.forEach((line) => {
    var newLine = line.split(',');
    var id = newLine[0];
    var style_id = newLine[1];
    var size = newLine[2];
    var quantity = newLine[3];

    // console.log('thumbnail_url: ', thumbnail_url);
    // console.log('Full line: ', id, style_id, url, thumbnail_url);
    pool.query('INSERT INTO skus (id, style_id, size, quantity) VALUES($1, $2, $3, $4)', [parseInt(id), parseInt(style_id), size, parseInt(quantity)]).catch((err) => {
      //console.log(line);
    });
  });
  stream.resume();
});

stream.on('end', () => {
  console.log('dog');
});