require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

if (process.env.DATABASE_NAME == null) {
  console.log(
    "No database string provided as ENV variable. Using default - mongodb://127.0.0.1:27017"
  );
}
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE || "mongodb://127.0.0.1:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => {
  if (err) console.log(err);
});
const init = require("./init");
db.once("open", () => {
  console.log("Successfully connected.");
  init();
  if (process.env.ACCESS_TOKEN_SECRET == null)
    console.log(
      "No secret token provided as ENV variable. Provide ACCESS_TOKEN_SECRET key in .env file and restart server."
    );
});

const usersRouter = require("./routes/users");
app.use("/api/users", usersRouter);

const daysRouter = require("./routes/days");
app.use("/api/days", daysRouter);

const productsRouter = require("./routes/products");
app.use("/api/products", productsRouter);

app.listen(process.env.PORT || 3000);
