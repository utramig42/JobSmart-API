const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "10.14.93.20",
  user: "root",
  password: "123456",
  database: "jobsmart"
});

connection.connect(err => {
  if (err) throw err;
  console.log("Banco de dados MYSQL conectado com suceso!");
});

module.exports = connection;
