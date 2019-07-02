const express = require("express");
const conn = require("./bd");
const app = express();

const getAllProducts =
  'SELECT p.id_prod as "id", p.nm_prod as "produto", m.nm_marca as "marca" FROM produto p JOIN marca m ON m.id_marca = p.id_marca WHERE p.ativo_prod IS TRUE;';

// Evitando problemas de CORS.
app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", (req, res) => {
  res.set({ "Content-Type": "application/JSON" });
  conn.query(getAllProducts, (err, rows, filds) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/:id", (req, res) => {
  res.set({ "Content-Type": "application/JSON" });
  conn.query(
    `SELECT DISTINCT p.id_prod as "id", p.nm_prod as "produto", m.nm_marca as "marca", p.qtd_min_prod as "qtdMin", p.obs_prod as "observacao", SUM(e.qtd_prod_est) as "qtdAtual", e.vlr_venda_est as "vlrVenda" 
    FROM produto p JOIN estoque e ON e.id_prod = p.id_prod JOIN marca m ON m.id_marca = p.id_marca WHERE p.ativo_prod IS TRUE AND p.id_prod = '${
      req.params.id
    }';`,
    (err, rows, filds) => {
      if (err) throw err;
      res.json(rows[0]);
    }
  );
});

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("API rodando na porta", port);
});
