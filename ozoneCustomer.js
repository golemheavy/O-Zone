const inquirer = require("inquirer");
// const chalk = require('chalk');

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
	
function main() {
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
});
	
	
}



