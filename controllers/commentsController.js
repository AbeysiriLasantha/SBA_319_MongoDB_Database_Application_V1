const Comments = require('../model/comments')

const fetchComments = async (req, res) => {
    console.log("Inside the fetchComments")
    // 1. Get all notes from database.
    // 2. Send them as a response
    const comments = await Comments.find();
    res.json({ comments: comments });
  };

  module.exports = {
    fetchComments    
  };
  