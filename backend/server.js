const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/menu", require("./routes/menuRoutes"));
app.use("/order", require("./routes/orderRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));






// require("dotenv").config();
// const express = require("express");
// const connectToDB = require("./config/db");
// const menuRoutes = require("./routes/menuRoutes");
// const orderRoutes = require("./routes/orderRoutes");

// const app = express();
// const PORT = process.env.PORT || 3000;

// //connect to our database
// connectToDB();

// //middleware -> express.json()
// app.use(express.json());



// //routes here
// app.use('/menu', menuRoutes);
// app.use('/order', orderRoutes);




// app.listen(PORT, () => {
//   console.log(`Server is now running on port ${PORT}`);
// });