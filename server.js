const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
    initial();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

//ไว้ดึง path รูป
app.use("/uploads", express.static("uploads"));
app.use(express.json());
//require("./app/routes/turorial.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
  Role.create({
    id: 2,
    name: "admin"
  });
}

//insert for roles
// const { Client } = require('pg');

// const client = new Client({
//   host: '127.0.0.1',
//   user: 'postgres',
//   database: 'projects',
//   password: 'bp0827705271',
//   port: 5432,
// });

// const insertUser = async (id, name) => {
//   try {
//     await client.connect();           // gets connection
//     await client.query(
//       `INSERT INTO "roles" ("id", "name","createdAt","updatedAt")  
//              VALUES ($1, $2,current_timestamp,current_timestamp),(2, 'admin',current_timestamp,current_timestamp)`, [id, name]); // sends queries
//     return true;
//   } catch (error) {
//     console.error(error.stack);
//     return false;
//   } finally {
//     await client.end();               // closes connection
//   }
// };

// insertUser(1, 'user').then(result => {
//   if (result) {
//     console.log('User inserted');
//   }
// });