const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const logger = require("./src/utils/logger");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Security Middleware
app.use(helmet()); // Set security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Body parser

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// Request Logging Middleware
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`, { ip: req.ip });
    next();
});

// Routes
app.use("/api/v1/menu", require("./src/catalog/menuRoutes"));
app.use("/api/v1/orders", require("./src/ordering/orderRoutes"));

// Basic Health Check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "UP", timestamp: new Date() });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`🚀 Server running on port ${PORT}`));