var connection = require("./DBConnection");
var inquirer = require("inquirer");
require("console.table");

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
        console.table(result);
        connection.end();
    });
}
//list all items with an inventory count lower than five.
function viewLowInventory() {
    var query = "Select item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5";
    connection.query(query, function (err, result) {
        if (err) throw err;
        if (result.length !=0) {
            console.table(result);
        } else{
            console.log("There is no low inventory on any product. Sufficient stock is available!");
        }
        
        connection.end();
    });
}

// display a prompt that will let the manager "add more" of any item currently in the store.
function addToInventory() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Please provide product ID to add more inventory?",
            },
            {
                name: "quantity",
                type: "input",
                message: "How many items would you like to add to inventory?",
            }
        ])
        .then(function (answer) {
            var selectquery = "SELECT stock_quantity, price FROM products WHERE item_id = ?";
            connection.query(selectquery, [answer.id], function (err1, res1) {
                if (err1) throw err1;
                var stockAvailable = parseInt(res1[0].stock_quantity);
                var updatedStock = stockAvailable + parseInt(answer.quantity);
                var updateQuery = "UPDATE products SET stock_quantity = ? WHERE item_ID =?";
                connection.query(updateQuery, [updatedStock, answer.id], function (err2, res2) {
                    if (err2) throw err2;
                    console.log("updated Inventory");
                });
                connection.end();
            });

        });
}
// allow the manager to add a completely new product to the store.
function addProduct() {
    inquirer
        .prompt([
            {
                name: "product",
                type: "input",
                message: "Product name?",
            },
            {
                name: "department",
                type: "input",
                message: "Department name?",
            },
            {
                name: "price",
                type: "input",
                message: "Price?",
            },
            {
                name: "quantity",
                type: "input",
                message: "Quantity?",
            }
        ])
        .then(function (answer) {
            var insertQuery = "INSERT INTO products SET ?";
            connection.query(insertQuery, {
                product_name: answer.product,
                department_name: answer.department,
                price: parseFloat(answer.price),
                stock_quantity: parseInt(answer.quantity)
            }, function (err, res) {
                if (err) throw err;
                console.log("New Product added!");
                connection.end();
            });

        });
}
