const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],  // Validation rule: Required field with custom error message
    minlength: [3, 'Title must be at least 3 characters long'],  // Validation rule: Minimum length
    maxlength: [100, 'Title must be less than 100 characters long'],  // Validation rule: Maximum length
    index: true  // Create an index on the title field
    
    },
  userName: {
    type: String,
    required: [true, 'User name is required'],  // Validation rule: Required field with custom error message
    minlength: [5, 'User name must be at least 5 characters long'],  // Validation rule: Minimum length
    maxlength: [15, 'User name must be less than 15 characters long'],  // Validation rule: Maximum length
  },
  category: {
    type: String,
    required: [true, 'Category is required'],  // Validation rule: Required field with custom error message
    enum: {
      values: ['Usability', 'Price', 'Return Policy'],  // Accept only "Online" or "In person"
        },
    },

  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,  // Prevent this field from being modified once set
    index: true  // Indexing the createdAt field for efficient sorting
  }
  
  
});

// Create a compound index 
// The title field is indexed in ascending order (A-Z).
// createdAt: -1: The createdAt field is indexed in descending order (latest date first).

commentsSchema.index({ title: 1});
commentsSchema.index({ title: 1, createdAt: -1 });

// Declares a new model Schema and its properties
const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Comments;

// Schema?: We create Models for our data and funnel the instances of those models through the routes we created.
