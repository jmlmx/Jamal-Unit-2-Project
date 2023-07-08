# Shopping Cart Api Overview

## What Does This App Do?:

This Api will allow you to create a user and add items to/remove items from a shopping cart as well as simulate "purchasing" those items.

## Necessities:

<ul>
<li><a href="https://nodejs.org">Node.js</a></li>
<li><a href="https://www.mongodb.com/cloud/atlas/register">MongoDB Atlas Database</a></li>
<li><a href="https://www.npmjs.com/package/nodemon">Nodemon</a></li>

</ul>


## How to Install:

1. Clone the repository and then save the files to a directory of your choosing on your computer

2. Install the dependencies by running <pre>npm i</pre> in the terminal (you'll need Node.js already installed for this command to work)

3. create a .env file in your repos root directory

4. Check that the .gitignore has both the ".env" and "node_modules" files in there

5. In the .env add your connection string for your MongoDB Database ex:<pre>MONGO_URI="your-string-here"</pre> and a variable for your jwt secret key ex: <pre>SECRET_KEY="your-secret-key-here"</pre>


## Starting The App In Dev Mode:

You can run the app in dev mode when in VS Code by inputting the command
<pre>npm run dev</pre> This will allow you to make changes while keeping the server from shutting off after each change.

You should get  confirmation of <pre>Ears Open on Port 3000...</pre> as well as <pre>Mongo is vibin' with us....</pre>

## Making an API request in Postman:

1. Be sure to turn on your server and then open Postman

2. Set the request based on the type you'll be sending(Get, POST, PUT, Delete)

3. Put the request in the URL (reference your routes folder), look at the routes requiring authentication, these will require changes to the authorization

4. Set the proper headers(authentication necessary endpoints only), body(raw JSON)

5. Input the required information in the body depending on the endpoint and send the request

## How To Run Supertest Tests/Artillery Tests:

### Jest & Supertest:

1. If the app is running press ctrl + c

2. In the terminal input <pre> npm run test</pre> this will test all test suites

3. If you want to test only user endpoints input into the terminal <pre>npm run testUsers</pre>

4. If you want to test only cart endpoints input into the terminal <pre>npm run testCarts</pre>

5. If you want to test only item endpoints input into the terminal <pre>npm run testItems</pre>

### Artillery Tests:

1. Split your terminal in VS Code

2. In the right terminal input <pre>npm run dev:load</pre> ths will start your server in dev mode so that all users created will be deleted once testing is over

3. In the left terminal input <pre>npm run load</pre> this will run 1200 server requests over 1 minute, you should receive 1200 code: 200.

## How To Start The App:

You can start the app normally by inputting the command <pre>npm run start</pre>

## Planning/Prep:

### Github Project
<a href=https://github.com/users/jmlmx/projects/2/views/1>Github Project Page</a>

### DrawSQL:
![DrawSQL](<assets/Project 2 DrawSQL.png>)

### Wire-frame:
![Wire-frame](<assets/Project 2 Wireframe.png>)