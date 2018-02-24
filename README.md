# MySQL-Bamazon
Amazon-like storefront with the MySQL and node.js. This is a command line App.

**Requirements:** 
1. Save and require the Inquirer, MySQL and console.table npm packages for data input and storage. Use "npm install" command to use npm packages.

**Customer View:**
1. Displays all available products for sale.
2. Prompts the user for item ID and quantity to make a purchase.
3. Once the order is placed, the application checks for availability of stock.
    * if available, customer's order is executed, stock quantity is updated in database accourdingly and displays    the total cost of purchase.
    * if not available, logs a phrase "Insufficient quantity!", and then prevent the order from going through.
    
**Manager View:**
1. Lists a set of menu options:
    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product
2. If a manager selects View Products for Sale, the app lists every available item: the item IDs, names, prices,      and quantities.
3. If a manager selects View Low Inventory, then it lists all items with an inventory count lower than five.
4. If a manager selects Add to Inventory, app displays a prompt that will let the manager "add more" of any item      currently in the store.
5. If a manager selects Add New Product, it allows the manager to add a completely new product to the store.

**Note:** 
* DBConnection.js is the file used for database connections.Commands to start application: for customer view - node bamazonCustomer.js and   Manager view - node bamazonManager.js. Find databse queries in schema.sql.
* Please refer word document "Screenshots.docx" for screenshots. You can also find it in [Google Docs](https://docs.google.com/document/d/1SbTVwIyWA8CBbeKWzEC1gEmuxRUnYE52vNtZhBgFX3I/edit?usp=sharing)
