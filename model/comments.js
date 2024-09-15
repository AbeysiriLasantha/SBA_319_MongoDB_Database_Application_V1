const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,  // Prevent this field from being modified once set
    index: true  // Indexing the createdAt field for efficient sorting
  }
  
});

// Declares a new model Schema and its properties
const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Comments;

// Schema?: We create Models for our data and funnel the instances of those models through the routes we created.
