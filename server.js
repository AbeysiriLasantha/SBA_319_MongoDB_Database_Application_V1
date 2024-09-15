require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb"); // Database connection function
const commentsController = require("./controllers/commentsController"); // Import controllers

const app = express();
const PORT = process.env.PORT || 3000;

// Express middleware
app.use(express.json());
app.use(cors());

const setupRoutes = () => {
  app.get("/", (req, res) => {
    res.json({ hello: "world" });
  });

  app.get("/comments", commentsController.fetchComments);
  //app.get("/note/:id", notesController.fetchNote);
  //app.post("/createnotes", notesController.createNote);
  //app.put("/updatenotes/:id", notesController.updateNote);
  //app.delete("/deletenotes/:id", notesController.deleteNote);
};

// Async function to handle database connection and server setup
const startServer = async () => {
  try {
    // Separate block: Database connection
    console.log("Connecting to the database...");
    await connectToDb();
    console.log("Database connected successfully.");

    // Separate block: API routes setup
    setupRoutes();

    // Starting the server
    app.listen(PORT, () => {
      console.log(`Express Server: Running - Port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database or start server:", error);
  }
};

// Execute the startServer function
startServer();
