const Comments = require('../model/comments')

const fetchComments = async (req, res) => {
    console.log("Inside the fetchComments")
    // 1. Get all comments from database.
    // 2. Send them as a response
    const comments = await Comments.find();
    res.json({ comments: comments });
  };

  const fetchComment = async (req, res) => {
    console.log("Inside search by ID")
    // 1. Get id off the url
    // 2. Find the comments using that id
    // 3. Send response with that comment as the payload
    const commentId = req.params.id;
    // ------------------------------(1)
    const comment = await Comments.findById(commentId);
    // ------------------------------(2)
    res.json({ comment: comment });
    // ------------------------------(3)
  };

  //Creat a comment by handling the error mesages 
const createComment = async (req, res) => {
    console.log("Inside the create endpoint");
  
    // 1. Get data from req.body
    const { title, userName, category } = req.body;
  
    try {
      // ------------------------------(1)
      const comment = await Comments.create({
        title: title,
        userName: userName,
        category: category
      });
      // ------------------------------(2)
      res.status(201).json({ comment: comment });
    } catch (error) {
      // Handle validation errors and other potential errors
      if (error.name === 'ValidationError') {
        res.status(400).json({ error: error.message });
      } else {
        // Handle other types of errors
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };

  const updateComment = async (req, res) => {
    console.log("Inside update") 
     // 1. Get data from req.body
     const commentId = req.params.id;
     const { title, userName, category } = req.body;
    
       // ------------------------------(2)
    try{
      const comment = await Comments.findByIdAndUpdate(commentId, {
        title: title,
        userName: userName,
        category: category
    });
    // ------------------------------(3)
    const updatedComment = await Comments.findById(commentId);
    res.json({ comment: updatedComment });
  } catch{
    res.json("Record cannot be updated");
    // ------------------------------(4)
  };}
  
  const deleteComment = async (req, res) => {
    console.log("Inside delete endpoint");
  
    // 1. Get id off url
    const commentId = req.params.id;
    console.log(commentId);
  
    try {
      // 2. Find the comment by ID
      const comment = await Comments.findById(commentId);
      console.log(comment);
  
      // 3. Check if the comment exists
      if (comment) {
        // If comment exists, delete it
        await Comments.deleteOne({ _id: commentId });
        res.json({ success: "Record Deleted Successfully" });
      } else {
        // If comment does not exist, send appropriate response
        res.json({ error: "Record not found" });
      }
    } catch (error) {
      // 4. Catch and handle any errors
      res.status(500).json({ error: "Record cannot be deleted" });
    }
  };
  

  module.exports = {
    fetchComments,
    fetchComment,
    createComment,
    updateComment, 
    deleteComment
  };
  