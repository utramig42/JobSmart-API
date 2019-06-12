const express = require("express");
const conn = require("./bd");
const app = express();

// Evitando problemas de CORS.
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", (req, res) => {
  res.set({ "Content-Type": "application/JSON" });
  conn.query("SELECT p.*,e.vlr_venda_est FROM produto p INNER JOIN estoque e ON e.id_prod = p.id_prod;", (err, rows, filds) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/:id", (req, res) => {
  res.set({ "Content-Type": "application/JSON" });



  conn.query(
    `SELECT p.*,e.vlr_venda_est 
    FROM produto p 
    INNER JOIN estoque e ON e.id_prod = p.id_prod 
    WHERE p.id_prod = '${req.params.id}' OR p.nm_prod LIKE '%${req.params.id}%'
    ORDER BY p.id_prod DESC`,
    (err, rows, filds) => {
      if (err) throw err;
      res.json(rows);
    }
  );
});

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("API rodando na porta", port);
});
