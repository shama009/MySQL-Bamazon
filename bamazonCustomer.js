var connection = require("./DBConnection");
var inquirer = require("inquirer");
require("console.table");

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayProductsForSale();
});

function displayProductsForSale() {
    var query = "Select item_id, product_name, price FROM products WHERE stock_quantity > 0";
    connection.query(query, function (err, result) {
        if (err) throw err;
        console.table(result);
        buyProducts();
    });
}

function buyProducts() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the product you would like to buy?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many items would you like to buy?"
            }
        ])
        .then(function (answer) {
            var query = "SELECT stock_quantity, price FROM products WHERE item_id = ?";
            connection.query(query, [answer.id], function (err, res) {
                if (err) throw err;
                var stockAvailable = parseInt(res[0].stock_quantity);
                var price = parseFloat(res[0].price);
                var userInputQuantity = parseInt(answer.quantity);
                var totalCost = price * userInputQuantity;
                if (stockAvailable >= userInputQuantity) {
                    var remainingStock = stockAvailable - userInputQuantity;
                    var updateQuery = "UPDATE products SET stock_quantity = ? WHERE item_id = ? ";
                    connection.query(updateQuery, [remainingStock, answer.id], function(err, result){
                        if (err) throw err;
                        console.log("Total Cost: " + totalCost); 
                        
                    });

                } else {
                    console.log("Insufficient quantity!\n Stock Available: "+ stockAvailable);
                }
                connection.end();
            });
            
        });

}


