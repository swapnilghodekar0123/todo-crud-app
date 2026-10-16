const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sequelize } = require("./config/db");
require("./models/Todo");

const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Todo API is running");
});

app.use("/api/todos", todoRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully!");

        await sequelize.sync();
        console.log("Tables synchronized successfully!");

        app.listen(process.env.PORT || 5000, () => {
            console.log(
                `Server running on port ${process.env.PORT || 5000}`
            );
        });
    } catch (error) {
        console.error("Startup failed:", error.message);
    }
};

startServer();