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
    const { title, userName, category } = req.body;
    const commentId = req.params.id;
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
    console.log("Inside delete endoint")
    // 1. Get id off url
    // 2. Delete the record
    // 3. Send a Response to confirm deletion
    const commentId = req.params.id;
    console.log(commentId)
    // ------------------------------(1)
    try {    
    const comment = await Comments.findById(commentId);
    console.log(comment)
     if (!comment) {  
      await Comments.deleteOne({
        id: commentId,
      });
      res.json({ success: "Record Deleted Successfully" });
     }else {
      res.json({ success: "Record is not available" });
     }
    // ------------------------------(2)
  
    } catch {
    res.json ("Record cannot be deleted");
    // ------------------------------(3)
  };}


  module.exports = {
    fetchComments,
    fetchComment,
    createComment,
    updateComment, 
    deleteComment
  };
  