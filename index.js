const express = require("express");
const conn = require("./bd");
const app = express();

app.get("/", (req, res) => {
  res.set({ "Content-Type": "application/JSON" });
  conn.query("SELECT * FROM produto", (err, rows, filds) => {
    res.json(rows);
  });
});

app.get("/:id", (req, res) => {
  res.set({ "Content-Type": "application/JSON" });
  conn.query(
    `SELECT * FROM produto WHERE id_prod = ${req.params.id} `,
    (err, rows, filds) => {
      res.json(rows);
    }
  );
});

app.listen("3000", "localhost", () => {
  console.log("Rodando em http://localhost:5000");
});
