var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

//database parameters
var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "Bamazon_db"
});

//database connection
con.connect(function(err) {
    if(err) {
        console.log("Error connecting to Db: " + err);
        return;
    }
});

console.log("BAM-BAM-BAMAZON");
console.log("Buy our stuff!");
console.log("What would you like to purchase:");
console.log("");

var prodArr = []; // Array to hold products info

// Function show products info
function purchasing() {

    // Get from database and create table with products info
    con.query("SELECT * FROM products", function(err, res) {

        if(err) {
            console.log("Error select: " + err);
            return;
        }

        //create formatted table: head and column size
        var table = new Table({
            head: ["ID", "Product", "Department", "Price ($)", "Qty"],
            colWidths: [5, 70, 15, 12, 5]
        });

        prodArr.length = 0; // Clears array

        for(var i=0;i<res.length;i++) {
            table.push([res[i].itemID,res[i].productName, res[i].departmentName, res[i].price.toFixed(2), res[i].stockQuantity]); // Add elements to table
            prodArr.push([res[i].itemID,res[i].productName, res[i].departmentName, res[i].price, res[i].stockQuantity, res[i].productSales]); // Add elements to array
        }
        console.log(table.toString() ); // display table
        console.log("");

        selector();
    });
}

//select products to purchase
function selector() {

    // Asks the ID and quantity
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID of your desired product:",
            name: "productId"
        }, {
            type: "input",
            message: "What quantity do you want?:",
            name: "quantity"
        }
    ]).then(function(a) {
        var id = parseInt(a.product_id); // make product ID into an int
        var requestedQty = parseInt(a.quantity); // maake the quantity into an int

        // check if product exists, recall the selector function
        if(id < 1 || id >= prodArr.length) {
            console.log("");
            console.log("No product found");
            console.log("");
            selector();
        }

        var stockQty = prodArr[id-1][4]; // Get stock quantity from array

        // If quanty greater than stock, call function again
        if(requestedQty > stockQty) {
            console.log("");
            console.log("Insufficient quantity!");
            console.log("Sorry, we only have " + stockQty +" available.");
            console.log("");
            selector();
        } 
        else {
            var updatedQty = stockQty - requestedQty; // Get the new stock value to update the database
            var cost = parseFloat(prodArr[id-1][5]) + (requestedQty * parseFloat(prodArr[id-1][3])); // Get the value to update the database
            var total = (requestedQty * parseFloat(prodArr[id-1][3])).toFixed(2); // Calculates the value total by the user

            // Updates the database
            con.query("UPDATE products SET ? WHERE ?", [
                {stockQuantity: updatedQty, productSales: cost.toFixed(2)},
                {itemID: id}
            ], function(err, res) {
                if(err) {
                    console.log("Error update: " + err);
                    return;
                }

                console.log("");
                console.log("You purchased " + requestedQty + " " + prodArr[id-1][1] + "(s)");
                console.log("You spent U$" + total + " dollar(s)");
            });
                // update department's sales total
                con.query('SELECT departmentId, totalSales FROM departments WHERE departmentName = ?', [prodArr[id-1][2]], function(err, res) {
                if(err) {
                    console.log('Error select: ' + err);
                    return;
                }

                var total = parseFloat(res[0].totalSales) + (requestedQty * parseFloat(prodArr[id-1][3]));

                // Update total sales of the department
                con.query('UPDATE departments SET ? WHERE ?', [
                    {totalSales: total.toFixed(2)},
                    {departmentID: res[0].departmentID}
                ], function(err, res) {
                    if(err) {
                        console.log('Error update: ' + err);
                        return;
                    }

                    console.log('');
                    console.log('');

                      //asks to "buy more?""
                    inquirer.prompt([
                    {
                    type: "list",
                    message: "Continue Shopping?",
                    choices: ["Yes", "No (Complete purchase)"],
                    name: "option"
                    }
                    ]).then(function(a) {
                    if(a.option == "Yes") {
                       purchasing(); // If yes, call function again
                    } 
                    else {
                    con.end(function(err) {}); // If no, ends the application
                    }
                    });
                });
            });
        }
    });
}

purchasing(); // Initial Function call