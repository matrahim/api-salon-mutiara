const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

app.use(bodyParser.json());

app.get("/findAll", (req, res) => {
  const sql = `SELECT * FROM booking`;
  db.query(sql, (error, result) => {
    console.log(error);
    response(200, result, "Get All Data Booking", res);
  });
});

app.get("/findBooking", (req, res) => {
  const sql = `SELECT * FROM booking WHERE id_user =${req.query.id}`;
  db.query(sql, (error, result) => {
    console.log(error);
    response(200, result, "Get All Data Booking Based on User", res);
  });
});

app.get("/findUser", (req, res) => {
  const sql = `SELECT * FROM user WHERE id_user =${req.query.id}`;
  db.query(sql, (error, result) => {
    console.log(error);
    response(200, result, "Get All Data User", res);
  });
});

app.post("/booking", (req, res) => {
  const data = req.body;
  const sql =
    "INSERT INTO booking (id_user,tanggal,waktu,hair_spesialis) VALUES (?,?,?,?)";
  const values = [data.id_user, data.tanggal, data.waktu, data.hair_spesialis];

  db.query(sql, values, (error, result) => {
    if (error) {
      response(500, result, error.sqlMessage, res);
    } else {
      response(200, result, "POST Data Booking", res);
    }
  });
});

app.post("/user", (req, res) => {
  const data = req.body;
  const sql = "INSERT INTO user (nama,password,email,no_hp) VALUES (?,?,?,?)";
  const values = [data.nama, data.password, data.email, data.no_hp];

  db.query(sql, values, (error, result) => {
    if (error) {
      response(500, result, error.sqlMessage, res);
    } else {
      response(200, result, "POST Data User", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Jalan Pada Port : ${port}`);
});
