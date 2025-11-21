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
app.use(helmet({
    hsts: {
        maxAge: 31536000, // 1 year in seconds
        includeSubDomains: true,
        preload: true
    }
})); // Set security headers with HSTS
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

const http = require('http');
const socketIO = require('socket.io');

// Routes
app.use("/api/v1/auth", require("./src/routes/authRoutes"));
app.use("/api/v1/restaurants", require("./src/routes/restaurantRoutes"));
app.use("/api/v1/menu", require("./src/routes/menuRoutes"));
app.use("/api/v1/orders", require("./src/routes/orderRoutes"));
app.use("/api/v1/payments", require("./src/routes/paymentRoutes"));

// Basic Health Check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "UP", timestamp: new Date() });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: "Server Error" });
});

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*", // Allow all origins for now, restrict in production
        methods: ["GET", "POST"]
    }
});

// Make io accessible in routes
app.set('io', io);

// Initialize Socket.io handler
require('./src/socket/socketHandler')(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => logger.info(`🚀 Server running on port ${PORT}`));