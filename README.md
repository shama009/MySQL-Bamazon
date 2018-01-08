# MySQL-Bamazon
Amazon-like storefront with the MySQL and node.js

Requirements: 
1. Save and require the Inquirer and MySQL npm packages for data input and storage. Use "npm install" command to use npm packages.

Customer View:
1. Displays all available products for sale.
2. Prompts the user for item ID and quantity to make a purchase.
3. Once the order is placed, the application checks for availability of stock.
    * if available, customer's order is executed, stock quantity is updated in database accourdingly and displays    the total cost of purchase.
    * if not available, logs a phrase "Insufficient quantity!", and then prevent the order from going through.


