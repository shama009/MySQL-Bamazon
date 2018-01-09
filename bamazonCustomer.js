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
                message: "Enter the ID of the product you would like to buy or Q to quit?",
                validate: function(value) {
                    if(value == "Q" || value == "q") {
                        return "GoodBye!!";
                    }
                    else if (isNaN(value) === false) {
                      return true;
                    }
                    else {
                        return "Please enter valid ID";
                    }
                    
                  }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many items would you like to buy?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return "Please enter valid quantity";
                  }
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


