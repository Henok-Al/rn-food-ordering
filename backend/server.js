require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/db");
const menuRoutes = require("./routes/menuRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

//connect to our database
connectToDB();

//middleware -> express.json()
app.use(express.json());

//routes here
app.use('/menu', menuRoutes);


app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});