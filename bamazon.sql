CREATE DATABASE Bamazon_db
DROP DATABASE IF EXISTS Bamazon_db;
USE Bamazon_db;

CREATE TABLE products (
	itemID integer(11) not null auto_increment,
    productName varchar(100) not null,
    departmentName varchar(50) not null,
    price decimal(10,2) not null,
    stockQuantity integer(100) not null,
    PRIMARY KEY (itemID)
);

/*Data for the table products */
INSERT INTO products
VALUES (01, "Dewalt Drill", "tools", 169.99, 11);

INSERT INTO products
VALUES (02, "X-acto Knife", "crafts", 13.99, 21);

INSERT INTO products
VALUES (03, "Sticky-notes", "office", 4.99, 79);

INSERT INTO products
VALUES (04, "The Time Machine", "books", 4.99, 32);

INSERT INTO products
VALUES (05, "Bamazon Kindling", "electronics", 399.00, 7);

INSERT INTO products
VALUES (06, "Hammer", "tools", 16.99, 48);

INSERT INTO products
VALUES (07, "Weapons Grade Plutonium", "crafts", 20690.99, 2);

INSERT INTO products
VALUES (08, "Snarf, and how to get snarfed without even trying", "books", 21.99, 38);

INSERT INTO products
VALUES (09, "T-shirt: I ordered from Bamazon and All I Got Was this T-shirt", "clothing", 5.99, 35);

INSERT INTO products
VALUES (10, "Kevlar Taticool Dress", "ladies", 980.00, 3);

INSERT INTO products
VALUES (11, "Ironic Trucker Hat", "ladies", 35.00, 24);

INSERT INTO products
VALUES (12, "Red Swingline Stapler", "office", 11.99, 43);

INSERT INTO products
VALUES (13, "How to speak Dog", "books", 11.99, 18);

INSERT INTO products
VALUES (14, "Yellow pollo shirt", "clothing", 19.99, 45);

INSERT INTO products
VALUES (15, "Black Purse", "ladies", 120.00, 5);

INSERT INTO products
VALUES (16, "Retro Velour Scarf", "ladies", 85.25, 11);

INSERT INTO products
VALUES (17, "So you've raised the dead, now what? A companion to the Necronomicon ex Mortis", "books", 13.00, 66);

INSERT INTO products
VALUES (18, "Chainsaw", "tools", 269.99, 3);

INSERT INTO products
VALUES (19, "Blue stain-resistant button up shirt", "clothing", 29.99, 13);

INSERT INTO products
VALUES (20, "Invisible ink pen", "office", 1.99, 4);


DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
  departmentID integer(11) not null,
  departmentName varchar(50) not null,
  overHeadCosts decimal(10,2) not null,
  totalSales decimal(10,2) not null,
  PRIMARY KEY (departmentID)
); 

/*Data for the table departments */

INSERT INTO departments
VALUES (01, "books" , 70.00, 190.00);

INSERT INTO departments
VALUES (02, "clothing" , 2500.00, 3000.00);

INSERT INTO departments
VALUES (03, "crafts" , 450.00, 480.00);

INSERT INTO departments
VALUES (04, "electronics" , 6000.00, 8200.00);

INSERT INTO departments
VALUES (05, "ladies" , 1000.00, 10000.00);

INSERT INTO departments
VALUES (06, "office" , 64.00, 75.00);

INSERT INTO departments
VALUES (07, "tools" , 2700.00, 1000.00);