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

var prodArr = []; // Array to hold products info

// displaye manager mode options
function selectOption() {

    //options displayed
    inquirer.prompt([
        {
            type: "list",
            message: "Choose an option:",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
            name: "option"
        }
    ]).then(function(a) {

        // Switch/case the answer
        switch (a.option) {
            case "View Products for Sale":
                console.log("");
                console.log(a.option + ":");
                console.log("");
                showProducts("itemID, productName, price, stockQuantity", "");
                break;

            case "View Low Inventory":
                console.log("");
                console.log(a.option + ":");
                console.log("");
                showProducts("itemID, productName, price, stockQuantity","WHERE stockQuantity <= 5");
                break;

            case "Add to Inventory":
                console.log("");
                console.log(a.option + ":");
                console.log("");
                addProduct();
                break;

            case "Add New Product":
                console.log("");
                console.log(a.option + ":");
                console.log("");
                addNewProduct();
                break;

            case "Exit":
                con.end(function(err) {}); // Ends application
                break;
        }
    });
}

//show products info
function showProducts(search, where) {

    // arguments call for information
    con.query("SELECT " + search + " FROM products " + where, function(err, res) {
        if(err) {
            console.log("Error select: " + err);
            return;
        }

        //create table: head and column size
        var table = new Table({
            head: ["ID", "Product", "Price ($)", "Qty"],
            colWidths: [5, 70, 12, 5]
        });

        for(var i=0;i<res.length;i++) {
            table.push([res[i].itemID,res[i].productName,res[i].price.toFixed(2),res[i].stockQuantity]); // Add elements to table
            prodArr.push([res[i].itemID,res[i].productName,res[i].price,res[i].stockQuantity]); // Add elements to array
        }
        console.log(table.toString()); // Show table
        console.log("");

        console.log("");
        selectOption(); // manager option function call
    });
}

//add stock to a product
function addProduct() {
    inquirer.prompt([
        {
            type: "input",
            message: "Type the Product ID you want to re-stock:",
            name: "productID"
        }, {
            type: "input",
            message: "Type the quantity you want to add:",
            name: "quantity"
        }
    ]).then(function(a) {
        var id = parseInt(a.productID); // identify product ID

        // check product ID exists
        if(id < 1 || id >= prodArr.length) {
            console.log("");
            console.log("No product found");
            console.log("");
            addProduct();
        }

        var quantity = parseInt(a.quantity); // turn the quanity into an integer
        quantity +=  parseInt(prodArr[id-1][3]);

        // Updates product stock
        con.query("UPDATE products SET ? WHERE ?", [
            {stockQuantity: quantity},
            {itemId: id}
        ], function(err, res) {
            if(err) {
                console.log("Error update: " + err);
                return;
            }

            console.log("");
            console.log("Product (" + prodArr[id-1][1] + ") stock increased from " + prodArr[id-1][3] + " to " + quantity);
            console.log("");
            selectOption(); // manager option function call
        });
    });
}

// create a new product
function addNewProduct() {

    // Departments are pulled from database and pushed to an array
    con.query("SELECT departmentName FROM departments ORDER BY departmentName", function(err, res) {
        if(err) {
            console.log("Error select: " + err);
            return;
        }

        var dep = []; 
        for(var i=0;i<res.length;i++) {
            dep.push(res[i].departmentName);
        }

        // product info entry
        inquirer.prompt([
            {
                type: "input",
                message: "Product Name:",
                name: "name"
            }, {
                type: "list",
                message: "Select the Department:",
                choices: dep,
                name: "department"
            }, {
                type: "input",
                message: " Enter the Price:",
                name: "price"
            }, {
                type: "input",
                message: "Enter Stock Quantity:",
                name: "stockQuantity"
            }
        ]).then(function(a) {

            // stock added to database
            con.query("INSERT INTO products SET ?", {
                productName: a.name,
                departmentName: a.department,
                price: parseFloat(a.price).toFixed(2),
                stockQuantity: parseInt(a.stockQuantity)
            }, function(err, res) {
                if(err) {
                    console.log("Error insert: " + err);
                    return;
                }

                console.log("");
                console.log("Product " + a.name + " added.");
                console.log("");
                selectOption(); // manager option function call
            });
        });
    });
}

selectOption(); // Initial Function call