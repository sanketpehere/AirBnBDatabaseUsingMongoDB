// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "*******",
//   database: "airbnb",
// });

// module.exports = pool.promise();

// const mongo = require("mongodb");

// const MongoClient = mongo.MongoClient;

// const MONGO_URL =
//   "mongodb+srv://root:root@aribnb.fej75.mongodb.net/?retryWrites=true&w=majority&appName=aribnb&tls=true";

// let _db;

// const mongoConnect = (callback) => {
//   MongoClient.connect(MONGO_URL)
//     .then((client) => {
//       console.log("Connected to mongo successfuly.");
//       _db = client.db("airbnb");
//       callback();
//     })
//     .catch((err) => {
//       console.log("Error while connecting to mongo", err.message);
//     });
// };

// const getDB = () => {
//   if (!_db) {
//     throw new Error("Mongo not connected");
//   }
//   return _db;
// };

// exports.mongoConnect = mongoConnect;
// exports.getDB = getDB;

const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const MONGO_URL =
  "mongodb+srv://root:root@aribnb.fej75.mongodb.net/airbnb?retryWrites=true&w=majority&appName=aribnb&tls=true";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL, {
    tls: true, // Keep TLS enabled
    serverSelectionTimeoutMS: 5000, // Timeout if server is unresponsive
  })
    .then((client) => {
      console.log("✅ Connected to MongoDB successfully.");
      _db = client.db(); // Automatically picks the database from URI
      callback();
    })
    .catch((err) => {
      console.error("❌ Error while connecting to MongoDB:", err.message);
    });
};

const getDB = () => {
  if (!_db) {
    throw new Error("MongoDB is not connected.");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
