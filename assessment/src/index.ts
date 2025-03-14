import * as express from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import routes from "./routes/route";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Connect to the database
AppDataSource.initialize()
    .then(() => {
        console.log("Connected to the database.");
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });

// Use routes
app.use("/api", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
