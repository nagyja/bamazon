var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

//database parameters
var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
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

var prod_arr = []; // Array to hold products info

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
            head: ["ID", "NAME", "DEPARTMENT", "$", "Qty"],
            colWidths: [5, 20, 15, 12, 5]
        });

        prod_arr.length = 0; // Clears array

        for(var i=0;i<res.length;i++) {
            table.push([res[i].itemId,res[i].productName,res[i].departmentName,res[i].price.toFixed(2),res[i].stockQuantity]); // Add elements to table
            prod_arr.push([res[i].itemId,res[i].productName,res[i].departmentName,res[i].price,res[i].stockQuantity,res[i].productSales]); // Add elements to array
        }
        console.log(table.toString()); // display table
        console.log("");

        selector(); // Call Function select products
    });
}

// Function select products to purchase
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
        if(id < 1 || id >= prod_arr.length) {
            console.log("");
            console.log("No product found");
            console.log("");
            selector();
        }

        var stockQty = prod_arr[id-1][4]; // Get stock quantity from array

        // If quantoty greater than stock, call function again
        if(requestedQty > stockQty) {
            console.log("");
            console.log("Insufficient quantity!");
            console.log("Sorry, we only have " + stockQty +" available.");
            console.log("");
            selector();
        } 
        else {
            var updatedQty = stockQty - requestedQty; // Get the new stock value to update the database
            var cost = parseFloat(prod_arr[id-1][5]) + (requestedQty * parseFloat(prod_arr[id-1][3])); // Get the value to update the database
            var total = (requestedQty * parseFloat(prod_arr[id-1][3])).toFixed(2); // Calculates the value total by the user

            // Updates the database
            con.query("UPDATE products SET ? WHERE ?", [
                {stockQuantity: updatedQty, productSales: cost.toFixed(2)},
                {item_id: id}
            ], function(err, res) {
                if(err) {
                    console.log("Error update: " + err);
                    return;
                }

                console.log("");
                console.log("You purchased " + requestedQty + " " + prod_arr[id-1][1] + "(s)");
                console.log("You spent U$" + total + " dollar(s)");
            });
                    //asks to "buy more?""
            inquirer.prompt([
                {
                type: "list",
                message: "Continue Shopping?",
                choices: ["Yes", "No (Exit)"],
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
        }
    });
}

purchasing(); // Initial Function call