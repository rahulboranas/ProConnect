import Comment from "../models/comments.model.js"
import Post from "../models/posts.model.js"
import Profile from "../models/profile.model.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
const activeCheck = async(req,res)=>{
     return res.status(400).json({
        message:"running"
     })
}
export default activeCheck

//create post
export const createPost =async (req,res)=>{
   const {token} = req.body;
   try{
    const user = await User.findOne({token:token});
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    let update = User.findByIdAndUpdate({_id:user._id})
    const post = new Post({
      userId : user._id,
      body:req.body.body,
      media : req.file != undefined ? req.file.filename : "",
      fileType:req.file !=undefined ? req.file.mimetype.split("/")[1] : ""
    })
    await post.save();
    
    return res.status(200).json({message:"Post Created"})
   }catch(error){
      return res.status(500).json({message:error.message})
   }
}

//get all posts
export const getAllPosts = async (req,res)=>{
   try{
      const posts = await Post.find().populate('userId','name username email profilePicture')
      return res.json({posts})
   }
   catch(error){
      return res.status(500).json({message:error.message})
   }
}

//delete Post
export const deletePost = async (req,res)=>{
   const {token,post_id}=req.body;
   try{
    const user = await User.findOne({token:token}).select("_id");
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    const post = await Post.findOne({_id:post_id});
    if(!post){
      return res.status(404).json({message:"Post not found"})
    }
    await Post.deleteOne({_id:post_id})
    return res.json({message:"Post Deleted"})
   }catch(error){
      return res.status(500).json({message:error.message})
   }
}

//create comment
export const commentPost = async(req,res)=>{
   const {token,post_id,commentBody} = req.body
   try{
const user = await User.findOne({token:token}).select("_id")
if(!user){
   return res.status(404).json({message:"User not found"})
}
const post = await Post.findOne({_id:post_id})
if(!post){
   return res.status(404).json({message:"Post not found"})
}
const comment = new Comment({
   userId:user._id,
   postId:post_id,
   body:commentBody
})
await comment.save()
return res.status(200).json({message:"comment added"})
   }catch(error){
      return res.status(500).json({message:error.message})
   }
}

//get all comments 
export const get_comments_by_posts = async (req, res) => {
  const { post_id } = req.query;
  try {
    const post = await Post.findOne({_id:post_id});
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // 🟢 Saare comments fetch karo jo iss post ke hain
    const comments = await Comment.find({ postId: post_id })
      .populate("userId", "name username ");

    return res.json( comments.reverse() );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//delete commen of user
export const delete_comment_of_user = async(req,res)=>{
   const {token,comment_id}=req.body
   try{
const user = await User.findOne({token:token}).select("_id")
if(!user){
   return res.status(404).json({message:"User not found"})
}
const comment = await Comment.findOne({_id:comment_id})
if(!comment){
   return res.status(404).json({message:"Comment not found"})
}
if(comment.userId.toString() !== user._id.toString()){
   return res.status(404).json({message:"User Unautharized"})
}
await Comment.deleteOne({_id:comment_id})
return res.json({message:"Comment deleted"})

   }catch(error){
      return res.status(500).json({message:error.message})
   }
}

//likes increament
export const increament_likes = async (req,res)=>{
   const {post_id}=req.body
   try{
const post = await Post.findOne({_id:post_id})
if(!post){
   return res.status(404).json({message:"Post not found"})
}
post.likes=post.likes+1;
await post.save();
return res.json({message:"like increament"})
   }catch(error){
return res.status(500).json({message:error.message})
   }
}




