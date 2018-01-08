var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "mysql123",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    manageInventory();
});

function manageInventory() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    viewLowInventory();
                    break;

                case "Add to Inventory":
                    addToInventory();
                    break;

                case "Add New Product":
                    addProduct();
                    break;
            }
        });

}
// list every available item: the item IDs, names, prices, and quantities.
function viewProducts() {
    var query = "Select item_id, product_name, price, stock_quantity FROM products";
    connection.query(query, function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            console.log("Item_ID: " + result[i].item_id + " || Product: " + result[i].product_name + " || Price: " + result[i].price + " || Quantity: " + result[i].stock_quantity);
        }
        connection.end();
    });
}
//list all items with an inventory count lower than five.
function viewLowInventory() {
    var query = "Select item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5";
    connection.query(query, function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            console.log("Item_ID: " + result[i].item_id + " || Product: " + result[i].product_name + " || Price: " + result[i].price + " || Quantity: " + result[i].stock_quantity);
        }
        connection.end();
    });
}

// display a prompt that will let the manager "add more" of any item currently in the store.
function addToInventory() {

}
// allow the manager to add a completely new product to the store.
function addProduct() {

}
