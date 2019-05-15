const inquirer = require("inquirer");
const mysql = require("mysql");
// const chalk = require('chalk');

const createMySQLConnection = async function () {
const connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"password",
	database:"ozone_online_retailer"
});

await connection.connect(function(err){
	console.log("Connected as id: " + connection.threadId);
});

}

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
		else return console.log("\nThank you for shopping.\n");
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
  console.log(JSON.stringify(answers, null, '  '));
  createMySQLConnection();
});
	
	
}

start();