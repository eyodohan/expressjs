const express = require("express");
const { accessControl, defaultMiddleware } = require("./middleware");

const users = [
  { id: 1, name: "Mustafa Murat", place: "Ankara" },
  { id: 2, name: "Serhat Say", place: "İstanbul" },
];

const app = express();

const PORT = 6000;

app.use(accessControl); // en üste yazdığımız için bütün yapılan isteklerde önce middleware çalışır Ancak sadece bir tanesinde çalışmasını istersek app.get("/users",accessControl (req, res, next) => {res.json(users);}); şeklinde yazmamız gerekiyor

//Get Request
// app.get("/users", [accessControl, defaultMiddleware], (req, res, next) => {
//   res.json(users);
// });

app.use(express.json()); // bu paketi kullanmazsak post yapığımızda undefined alırız
app.get("/products", (req, res, next) => {
  res.send("products");
});

app.get("/users", (req, res, next) => {
  res.json({
    success: true,
    data: users,
  });
});

//Post request
app.post("/users", (req, res, next) => {
  const user = req.body;
  users.push(user);
  res.json({
    success: true,
    data: users,
  });
});

//Put request
app.put("/users/:id", (req, res, next) => {
  //   console.log(req.params.id);
  const id = +req.params.id;
  for (let i = 0; i < users.length; ++i) {
    if (users[i].id === id) {
      users[i] = {
        ...users[i],
        ...req.body,
      };
    }
  }
  res.json({
    success: true,
    data: users,
  });
});
//Delete request
app.delete("/users/:id", (req, res, next) => {
  const id = +req.params.id;
  for (let i = 0; i < users.length; ++i) {
    if (users[i].id === id) {
      users.splice(i, 1);
    }
  }

  res.json({
    success: true,
    data: users,
  });
});

app.listen(PORT, () => {
  console.log("server started PORT:" + PORT);
});
