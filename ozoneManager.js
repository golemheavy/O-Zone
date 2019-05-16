const Table = require('cli-table3');
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


function printMenu() {
var table = new Table({ head: ["Please Choose an option"] });

table.push(
	["* View Products for Sale"],
	["* View Low Inventory"],
	["* Add to Inventory"],
	["* Add New Product"]
);
	console.log(table.toString());
}

function start() {
	
	printMenu();

	var questions = [
	{
		type: 'list',
		name: 'selectOption',
		message: 'Option',
		choices: ["View Products","View Low Inventory","Add to Inventory","Add New Product"]
	}
	];
	inquirer.prompt(questions).then(answers => {
		console.log(answers);
		switch (answers.selectOption) {
			case "View Products": viewProducts(); break;
			case "View Low Inventory": viewLowInventory(); break;
			case "Add to Inventory": addInventory(); break;
			case "Add New Product": addProduct(); break;
			default: break;
		}
		connection.end();
	});
}

function viewProducts() {
	const qry = "";
	arr = [];
	executeQuery(qry, arr);	
	// * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
}
function viewLowInventory() {
	const qry = "SELECT * FROM products WHERE  QTY_in_stock < 5;";
	executeQuery(qry);
	// * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
}
function addInventory() {
	const qry = "";
	arr = [];
	executeQuery(qry, arr);	
	// * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
}
function addProduct() {
	const qry = "";
	arr = [];
	executeQuery(qry, arr);	
	// * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
}

function executeQuery(qry, arr) {
	//this function executes the query 
	if (!arr) arr = [];
	connection.query(qry,arr,function(err, res){
		console.log(res);
		console.log('\nExecuted query:\t"' + qry + '" with values:\t' + function(){if (arr.length === 0) return "none"; else return arr.toString();}());
	});
}
