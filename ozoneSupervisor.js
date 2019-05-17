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
	console.clear();
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
		choices: ["View Products","View Low Inventory","Add to Inventory","Add New Product"]
	}
	];
	inquirer.prompt(questions).then(answers => {
		console.log(answers);
		switch (answers.selectOption) {
			case "View Products": console.clear(); viewProducts(); break;
			case "View Low Inventory": console.clear(); viewLowInventory(); break;
			case "Add to Inventory": console.clear(); addInventory(); break;
			case "Add New Product": console.clear(); addProduct(); break;
			default: break;
		}
	});
}

function promptForContinue() {
	inquirer.prompt([
	{
		type	: 'confirm',
		name	: 'continue',
		message	: 'Would you to continue?',
	}
	]).then(answers => {
		if (answers.continue) start();
		else connection.end();
	});
}

function viewProducts() { // list every available item: the item IDs, names, prices, and quantities.
	const qry = "SELECT item_id, product_name, price, QTY_in_stock as In_Stock, department_name, product_sales FROM PRODUCTS P INNER JOIN DEPARTMENTS D ON P.DEPARTMENT_ID = D.DEPARTMENT_ID;";
	executeQuery(qry);	
}

function viewLowInventory() {// list all items with an inventory count lower than five.
	const qry = "SELECT * FROM products WHERE QTY_in_stock < ?";
	const arr = ["5"];
	executeQuery(qry,arr);
}

function addInventory() {
	//prompt for which item and how many to increase it by
		
connection.query("SELECT CONCAT('item_id ', item_id, ' ', product_name, ' qty: ', QTY_in_stock) AS product FROM products;",[],function(err, res){
	if (err) throw err;
	let choiceArr = [];
	for (x in res) {
		choiceArr.push(res[x].product);
	}
	var questions = [
	{
		type: 'list',
		name: 'selectItem',
		choices: choiceArr  // load the choices dynamically
	},
	{
    type: 'input',
    name: 'addUnits',
	message: 'What would you like to change the quantity to?',
    //message: 'How many units would you like to add?',  FIX THIS -- should let you add to, not overwrite
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number
	}
	];
	inquirer.prompt(questions).then(answers => {
		console.log(answers);
		const qry = "update products set QTY_IN_STOCK = ? where ITEM_ID = ?";
		const arr = [answers.addUnits.toString(),answers.selectItem.split(" ")[1]];
		console.log(qry);
		console.log(arr);
		connection.query(qry,arr,function(err, res){
			if (err) throw err;
			//console.log(res);
			console.log('\nExecuted query:\t"' + qry + '" with values:\t' + function(){if (typeof arr === "undefined" || arr.length === 0) return "none"; else return arr.toString();}());
			console.log("result:");
			console.log(res.message + ")");
			promptForContinue();
		});
	});
	});
}

function addProduct() { // allow user to add a completely new product to the store.
	
	connection.query("DESCRIBE PRODUCTS",[],function(err, res){
		if (err) throw err;
		if (typeof res !== "undefined" && res.length > 0) {
			let intFieldNameArr = [];
			let stringFieldNameArr = [];
			let x;
			for (x in res) {
				if (res[x].Key === "" && res[x].Type.startsWith("int")) intFieldNameArr.push(res[x].Field);
				else if (res[x].Key === "" && res[x].Type.startsWith("varchar")) stringFieldNameArr.push(res[x].Field);
			}
			
			let y, z = 0;
			let questions = [];
			for (y in stringFieldNameArr) {
				questions.push({type: "input", name: stringFieldNameArr[y], message: "Please enter value for " + stringFieldNameArr[y]});
			}
			for (z in intFieldNameArr) {
				questions.push({
					type: "input",
					name: intFieldNameArr[z],
					message: "Please enter value for " + intFieldNameArr[z],
					validate: function(value) {
						var valid = !isNaN(parseFloat(value));
						return valid || 'Please enter a number';
					},
					filter: Number});
			}
			
			inquirer.prompt(questions).then(answers => {
				//console.log(JSON.stringify(answers, null, '  '));
				var query = connection.query("INSERT INTO PRODUCTS SET ?",answers,function(err, res) {
					if (err) throw err;
					console.log(res.affectedRows + " items inserted!\n");
					console.log(query.sql); // query which ran
					// Call updateProduct AFTER the INSERT completes
					//updateProduct();
					promptForContinue();
				});
			});
		}
	})
};

function executeQuery(qry, arr) {
	//this function executes the query 
	//if (typeof arr === "undefined") arr = []; // this line is not needed
	connection.query(qry,arr,function(err, res){
		if (err) throw err;
		if (typeof res !== "undefined" && res.length > 0) { // this checks to ensure that res is not an empty array
		
		let printRes = 
		function(){
			let columns = Object.keys(res[0]);
			let table = new Table({ head: columns });
			let x;
			for (x in res) {
				let rowArr = [];
				for (y in columns) {
					rowArr.push(res[x][columns[y]]);
					}
				table.push(rowArr);
			}
			console.log(table.toString());
		}();
		
		console.log('\nExecuted query:\t"' + qry + '" with values:\t' + function(){if (typeof arr === "undefined" || arr.length === 0) return "none"; else return arr.toString();}());
		}
		else console.log ("\nno results.\n");
		promptForContinue();
	});
}