const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const cors = require("cors");
const routes = require("./routes/ToDoRoute");
const UserModel = require("./models/UserModel");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb Connected..."))
  .catch((err) => console.error(err));

// Routes
app.use(routes);

//sign up
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  UserModel.findOne({ email: email }, (err, result) => {
    console.log(result);
    console.log(err);
    if (result) {
      res.send({ message: "Email id is already register", alert: false });
    } else {
      const data = UserModel(req.body);
      const save = data.save();
      res.send({ message: "Successfully sign up", alert: true });
    }
  });
});

//api login
app.post("/login", (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  UserModel.findOne({ email: email }, (err, result) => {
    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
      };
      console.log(dataSend);
      res.send({
        message: "Login is successfully",
        alert: true,
        data: dataSend,
      });
    } else {
      res.send({
        message: "Email is not available, please sign up",
        alert: false,
      });
    }
  });
});

app.listen(PORT, () => console.log("Server running on port " + PORT));
