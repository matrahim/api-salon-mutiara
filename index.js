const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
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

app.get("/hairstyle", (req, res) => {
  const sql = `SELECT * FROM hairstyle`;
  db.query(sql, (error, result) => {
    console.log(error);
    response(200, result, "Get All Data Hairstyle", res);
  });
});
app.get("/layanan", (req, res) => {
  const sql = `SELECT * FROM layanan`;
  db.query(sql, (error, result) => {
    console.log(error);
    response(200, result, "Get All Data Layanan", res);
  });
});

app.get("/findBooking", (req, res) => {
  const sql = `SELECT * FROM booking left join hairstyle on booking.id_hairstylist=hairstyle.id_hairstylist WHERE id_user=${req.query.id} ORDER BY booking.tanggal DESC, booking.waktu DESC;`;
  db.query(sql, (error, result) => {
    console.log(error);
    response(200, result, "Get All Data Booking Based on User", res);
  });
});

app.get("/booking", (req, res) => {
  console.log(req.query.tanggal);
  const sql = `SELECT * FROM booking left join hairstyle on booking.id_hairstylist=hairstyle.id_hairstylist left join user on user.id_user=booking.id_user WHERE tanggal=${req.query.tanggal} ORDER BY tanggal DESC,  booking.waktu DESC;`;
  db.query(sql, (error, result) => {
    console.log(error);
    response(200, result, "Get All Data Booking Based on User", res);
  });
});
app.get("/findBookingBy", (req, res) => {
  // console.log(req.query);
  const sql = `SELECT * FROM booking WHERE tanggal = ${req.query.tanggal} AND waktu = ${req.query.waktu}`;
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

app.get("/user", (req, res) => {
  const sql = `SELECT * FROM user WHERE email =${req.query.email} AND password=${req.query.password}`;
  db.query(sql, (error, result) => {
    console.log(error);
    response(200, result, "Get Data User", res);
  });
});

app.post("/booking", (req, res) => {
  const data = req.body;
  console.log(data);
  const sql =
    "INSERT INTO booking (id_user,tanggal,waktu,id_hairstylist) VALUES (?,?,?,?)";
  const values = [data.id_user, data.tanggal, data.waktu, data.id_hairstylist];

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
