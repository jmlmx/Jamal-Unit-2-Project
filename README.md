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

## Making an API request in Postman:

## How To Run Tests:

## How To Start The App:

You can start the app normally by inputting the command <pre>npm run start</pre>

## Planning/Prep:

### Github Project
<a href=https://github.com/users/jmlmx/projects/2/views/1>Github Project Page</a>

### DrawSQL:
![DrawSQL](<assets/Project 2 DrawSQL.png>)

### Wire-frame:
![Wire-frame](<assets/Project 2 Wireframe.png>)