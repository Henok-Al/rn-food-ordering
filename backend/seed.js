const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Menu = require("./models/Menu");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const sampleMenu = [
    {
        name: "Margherita Pizza",
        description: "Classic delight with 100% real mozzarella cheese.",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Pizza",
    },
    {
        name: "Pepperoni Pizza",
        description: "American classic with spicy pepperoni slices.",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Pizza",
    },
    {
        name: "Cheeseburger",
        description: "Juicy grilled beef patty with cheddar cheese.",
        price: 10.99,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Burger",
    },
    {
        name: "Veggie Burger",
        description: "Plant-based patty with fresh lettuce and tomato.",
        price: 11.99,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Burger",
    },
    {
        name: "Caesar Salad",
        description: "Crisp romaine lettuce with parmesan and croutons.",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Salad",
    },
    {
        name: "Sushi Platter",
        description: "Assorted fresh sushi rolls and nigiri.",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Sushi",
    },
];

const seedData = async () => {
    try {
        await Menu.deleteMany();
        console.log("Menu cleared");

        await Menu.insertMany(sampleMenu);
        console.log("Menu seeded successfully");

        process.exit();
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();
