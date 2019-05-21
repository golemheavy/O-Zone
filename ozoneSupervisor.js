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
	["* View Products and Sales by Department"],
	["* Create New Department"]
);
	console.log(table.toString());
}

function start() {
	
	printMenu();

	var questions = [
	{
		type: 'list',
		name: 'selectOption',
		choices: ["View Products and Sales by Department","Create New Department"]
	}
	];
	inquirer.prompt(questions).then(answers => {
		console.log(answers);
		switch (answers.selectOption) {
			case "View Products and Sales by Department": console.clear(); prodSalesByDept(); break;
			case "Create New Department": console.clear(); insertNewDept(); break;
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

function prodSalesByDept() { // this query won't bring back departments with no items in it. but it will show sales of items with no department
	const qry = `select
  SUBQ.department_id,
  SUBQ.department_name,
  SUBQ.over_head_costs,
  SUM(SUBQ.product_sales)/100 as product_sales,
  SUM(SUBQ.PRODUCT_SALES - SUBQ.over_head_costs)/100 as total_profits
from
(SELECT 
  D.*,
  P.product_sales
  -- DeptSales - (d.over_head_costs) as total_profit
FROM PRODUCTS P
LEFT JOIN DEPARTMENTS D ON P.DEPARTMENT_ID = D.DEPARTMENT_ID) SUBQ
group by SUBQ.DEPARTMENT_ID
order by SUBQ.PRODUCT_SALES desc;`;
	const arr = [];
	executeQuery(qry,arr);
}

function insertNewDept() {
	
		connection.query("DESCRIBE DEPARTMENTS",[],function(err, res){
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
				var query = connection.query("INSERT INTO DEPARTMENTS SET ?",answers,function(err, res) {
					if (err) throw err;
					console.log(res.affectedRows + " items inserted!\n");
					console.log(query.sql); // query which ran
					promptForContinue();
				});
			});
		}
	})
}

function executeQuery(qry, arr) { //this function executes the query 
	connection.query(qry,arr,function(err, res){
		if (err) throw err;
		if (typeof res !== "undefined" && res.length > 0) { // this checks to ensure that res is not an empty array
		
			let printRes = function(){
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

			//following line is for debugging purposes
			//console.log('\nExecuted query:\t"' + qry + '" with values:\t' + function(){if (typeof arr === "undefined" || arr.length === 0) return "none"; else return arr.toString();}());
		}
		else console.log ("\nno results.\n");
		promptForContinue();
	});
}