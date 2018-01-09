DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INTEGER AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity  INTEGER NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Harry Potter and the Sorcerer's Stone", "Books", 6.99, 350);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Beneath a Scarlet Sky", "Books", 5.99, 500);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("A Man Called Ov", "Books", 4.99, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Wonder", "Books", 9.99, 350);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Dining Table with chairs", "Furniture", 399, 150);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Recliner sofa", "Furniture", 789, 250);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("iPhonex", "Electronics", 999.99, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Gaming Laptop", "Electronics", 1595, 150);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("LG 4k UHD OLED TV", "Electronics", 1295, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("ps4 console", "Electronics", 399, 300);

SELECT * FROM products;

-- updated record to test low inventory scenario
UPDATE products SET stock_quantity = 2 WHERE product_name = 'iPhonex';