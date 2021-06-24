DROP DATABASE IF EXISTS product;
CREATE DATABASE product;

\c product;

DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(500) NOT NULL,
  slogan text NOT NULL,
  description text NOT NULL,
  category VARCHAR(500) NOT NULL,
  default_price INT NOT NULL
);

DROP TABLE IF EXISTS related;
CREATE TABLE related (
  id INT PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  related_id INT NOT NULL
);\d

DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
  id INT PRIMARY KEY NOT NULL,
  style_id INT NOT NULL,
  url text NOT NULL,
  thumbnail_url text NOT NULL
);

DROP TABLE IF EXISTS skus;
CREATE TABLE skus (
  id INT PRIMARY KEY NOT NULL,
  style_id INT NOT NULL,
  size VARCHAR(20) NOT NULL,
  quantity INT NOT NULL
);

DROP TABLE IF EXISTS styles;
CREATE TABLE styles (
  id INT PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  sale_price INT NULL,
  original_price INT NOT NULL,
  default_style INT NOT NULL
)