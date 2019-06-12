# webapp

> restaurant webapp for glints. Developed using MEVN stack (MongoDB, Express.js, Vue.js, Node.js)

Prerequisites to for the webapp
Node.js/NPM installed
MongoDB installed

Download the csv file containing the list of restaurant into Mongodb root directory
Import the csv file into the database with the command "./mongoimport -d restaurant -c restaurent --type CSV --file *filename*.csv -field restaurent,hours
Start MongoDB in port 27017 with command "./mongod"

With a seperate terminal
Run npm install to build dependencies for vue.js frontend
run "npm run dev" to start vue.js frontend on port:8080 of localhost

With a seperate terminal
cd to /server and run npm install to build dependencies for node.js backend
run "npm start" to start node.js server on port:8081 of localhost



