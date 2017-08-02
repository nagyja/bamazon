CREATE DATABASE Bamazon_db;
DROP DATABASE IF EXISTS Bamazon_db;
USE Bamazon_db;

create table products (
	ItemID integer(100) not null,
    ProductName varchar(100) not null,
    DepartmentName varchar(50) not null,
    Price integer(255) not null,
    StockQuanitiy integer(100) not null
);

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
VALUES (09, "I ordered from Bamazon and All I Got Was this T-shirt", "clothing", 5.99, 35);

INSERT INTO products
VALUES (10, "Kevlar Taticool Dress", "ladies", 980.00, 3);

INSERT INTO products
VALUES (11, "Ironic Trucker Hat", "ladies", 35, 24);

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
VALUES (17, "So you've raised the dead? A companion to the Necronomicon ex Mortis", "books", 13.00, 66);

INSERT INTO products
VALUES (18, "Chainsaw", "tools", 269.99, 3);

INSERT INTO products
VALUES (19, "Blue stain-resistant button up shirt", "clothing", 29.99, 13);

INSERT INTO products
VALUES (20, "Invisible ink pen", "office", 1.99, 4);