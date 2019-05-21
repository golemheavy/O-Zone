# O-Zone
The Online Outlet Zone is an online store. This project uses Node.js and MySQL.

This application is a suite of three files, each of which is meant to be run separately for different functions, as defined in the requirements.

To use this suite, first clone the repository. Then, install node package dependencies by running invoking `npm install` from the command line.

You will also need to set up a database and seed it by running the sql script in the /DBseeds/ folder.

After the repo has been cloned and the npm packages installed, you can run any of the following three nodejs files to interact with the database.

1. ozoneCustomer.js: invoke `node ozoneCustomer.js` from the command line.
2. ozoneManager.js: invoke `node ozoneManager.js` from the command line.
3. ozoneSupervisor.js: invoke `node ozoneSupervisor.js` from the command line.

## ozoneCustomer.js

To run ozoneCustomer.js, invoke `node ozoneCustomer.js` from the command line.

The first thing you will see will be, a list of products available for sale, along with their item IDs, their prices, their names and how many are in stock.

![ozoneCustomer.js](./images/1.PNG)

You will be asked if you would like to purchase anything. Press the 'y' key for yes or any other key to exit, and press enter.

![ozoneCustomer.js](./images/2.PNG)

You will be asked to enter the ID number of the item you would like to purchase.

To purchase a product, enter the item_id value for that product, and press enter.

![ozoneCustomer.js](./images/3.PNG)


![ozoneCustomer.js](./images/4.PNG)
![ozoneCustomer.js](./images/5.PNG)


![ozoneManager.js](./images/ozoneManager1.PNG)
![ozoneManager.js](./images/ozoneManager2.PNG)
![ozoneManager.js](./images/ozoneManager3.PNG)
![ozoneManager.js](./images/ozoneManager4.PNG)
![ozoneManager.js](./images/ozoneManager5.PNG)
![ozoneManager.js](./images/ozoneManager6.PNG)
![ozoneManager.js](./images/ozoneManager7.PNG)
![ozoneManager.js](./images/ozoneManager8.PNG)
![ozoneManager.js](./images/ozoneManager9.PNG)
![ozoneManager.js](./images/ozoneManager10.PNG)

![ozoneSupervisor.js](./images/ozoneSupervisor1.PNG)
![ozoneSupervisor.js](./images/ozoneSupervisor2.PNG)
![ozoneSupervisor.js](./images/ozoneSupervisor3.PNG)
![ozoneSupervisor.js](./images/ozoneSupervisor4.PNG)
![ozoneSupervisor.js](./images/ozoneSupervisor5.PNG)


Challenge 1:

### Challenge #1: Customer View (Minimum Requirement)

1. Create a MySQL Database called `bamazon`.

2. Then create a Table inside of that database called `products`.

3. The products table should have each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

6. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.
