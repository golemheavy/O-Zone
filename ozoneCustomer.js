const inquirer = require("inquirer");
const mysql = require("mysql");
// const chalk = require(..);

let connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"password",
	database:"ozone_online_retailer"
});

connection.connect(function(err){
	console.log("Connected as id: " + connection.threadId + "\n");
	start();
});

function start() {
	console.log("\n\tO-zone retailer CLI\n");
	
	inquirer.prompt([
	{
		type	: 'confirm',
		name	: 'makePurchase',
		message	: 'Would you like to purchase something?',
	}
	]).then(function(answers) {
		if (answers.makePurchase) {
			console.log("\nRetrieving Data");
			console.log("\n-----------------------------\n");
			main();
		}
		else {
			connection.end();
			return console.log("\nThank you for shopping.\n");
		}
	});
}

function transactPurchase(id, newQty, prodSales, oldSales) {
	//const qry = "UPDATE products set QTY_IN_STOCK = ? where ITEM_ID = ?";
	const newTotalSales = prodSales + oldSales;
	const qry = "UPDATE PRODUCTS SET ? WHERE ITEM_ID = ?";
	const updObj = {QTY_IN_STOCK: newQty, product_sales: newTotalSales};
	arr = [updObj, id];
	connection.query(qry,arr,function(err, res){
		console.log("updating id " + id + " to " + newQty + " units and adding " + prodSales/100 + " to product sales for a total of " + newTotalSales/100 );
		/*
		const qry = "";
		arr = [];
		connection.query(qry,arr,function(err, res){
		});
		*/
		connection.end();
	});
}
	
function main () {
	var questions = [
		{
			type: 'input',
			name: 'productId',
			message: 'Please enter the product ID of the product you want to buy',
			validate: function(value) {
				var valid = !isNaN(parseFloat(value));
				return valid || 'Please enter a number';
			},
			filter: Number
		},
		{
			type: 'input',
			name: 'qtyToPurchase',
			message: 'How many would you like to buy?',
			validate: function(value) {
				var valid = !isNaN(parseFloat(value));
				return valid || 'Please enter a number';
			},
			filter: Number
		}
	];

	inquirer.prompt(questions).then(answers => {
		console.log('\n');
		connection.query("SELECT * FROM products WHERE item_id = ?",[answers.productId], function(err, res) {
			if (err) throw err;
			let difference = res[0].QTY_in_stock - answers.qtyToPurchase;
			if (difference >= 0) {
				let crntSales = ((answers.qtyToPurchase * res[0].price));
				console.log(res[0].product_name + ":\t" + answers.qtyToPurchase + " @ " + res[0].price + " = $" + crntSales/100)
				transactPurchase(answers.productId, difference, crntSales, res[0].product_sales) ; // update qty and product sales, and log result
			}
			else console.log("Insufficient Quantity!");
		});	
	});
}