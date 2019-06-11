const mysql = require("mysql");
const dataConnection = require('./dataConnection.json');

let connection = mysql.createConnection(dataConnection);

connection.connect(err => {
  if (err) throw err;
  console.log("Banco de dados MYSQL conectado com suceso!");
});

module.exports = connection;
