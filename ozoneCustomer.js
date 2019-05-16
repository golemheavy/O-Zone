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

function transactPurchase(id, newQty) {
	const qry = "UPDATE products set QTY_IN_STOCK = ? where ITEM_ID = ?";
	arr = [newQty, id];
	connection.query(qry,arr,function(err, res){
		console.log("updating id " + id + " to " + newQty + " units.");
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
		//console.log(JSON.stringify(answers, null, '  '));
		connection.query("SELECT * FROM products WHERE item_id = ?",[answers.productId], function(err, res) {
			if (err) throw err;
			let difference = res[0].QTY_in_stock - answers.qtyToPurchase;
			if (difference >= 0) {
				console.log(res[0].product_name + ":\t" + answers.qtyToPurchase + " @ " + res[0].price + " = $" + ((answers.qtyToPurchase * res[0].price)/100))
				transactPurchase(answers.productId, difference) ; // update qty and  console .log result
			}
			else console.log("Insufficient Quantity!");
		});	
	});
}