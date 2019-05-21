const inquirer = require("inquirer");
const mysql = require("mysql");

const configObj = {
	host:"localhost",
	port:3306,
	user:"root",
	password:"password",
	database:"ozone_online_retailer"
};

let connection = {};


function Database(config) {
	this.connection = mysql.createConnection(config);
	this.query = function (sql, args, cb) {
		return new Promise((resolve, reject) => {
			this.connection.query(sql, args, (err, rows) => {
				if (err) return reject(err);
				resolve(rows);
			});
		});
	}
	this.close = function() {
		return new Promise((resolve, reject) => {
			this.connection.end( err => {
				if (err) return reject(err);
				resolve();
			});
		});
	}
}

function printTable() {
	
	console.clear();
	
	const db = new Database(configObj);
	
	const qry = "SELECT * FROM PRODUCTS";
	const arr = [];
	db.query(qry,arr).then(rows => console.table(rows));
	db.close().then(purchasePrompt);
}

function purchasePrompt () {
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
			//connection.end();
			return console.log("\nThank you for shopping.\n");
		}
	});
}

function start() {
	console.log("\n\tO-zone retailer CLI\n");
	
	printTable();	
}

function transactPurchase(id, newQty, prodSales, oldSales) {
	//const connection = new Database(configObj);
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
		
		connection = mysql.createConnection(configObj);
		
		connection.connect(function(err){
			if (err) throw err;
		});
		
		
		connection.query("SELECT * FROM products WHERE item_id = ?",[answers.productId], function(err, res) {
			if (err) throw err;
			if (res[0]) {
				let difference = res[0].QTY_in_stock - answers.qtyToPurchase;
				if (difference >= 0) {
					let crntSales = ((answers.qtyToPurchase * res[0].price));
					console.log(res[0].product_name + ":\t" + answers.qtyToPurchase + " @ " + res[0].price + " = $" + crntSales/100);
					transactPurchase(answers.productId, difference, crntSales, res[0].product_sales) ; // update qty and product sales, and log result
				}
				else console.log("Insufficient Quantity!");
			}
			else {
				console.log("\n\tThat product doesn't exist. Goodbye\n");
				connection.end();
			}
		});	
	});
}

start();