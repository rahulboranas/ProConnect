import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createServerParamsForMetadata } from "next/dist/server/request/params";

// 🔹 Get all posts
export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (_, thunkAPI) => {
    try {
      const response = await clientServer.get("/posts");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error fetching posts");
    }
  }
);

// 🔹 Create a new post
export const createPost = createAsyncThunk(
  "post/createPost",
  async (userData, thunkAPI) => {
    const { file, body } = userData;
    try {
      const formData = new FormData();
      formData.append("token", localStorage.getItem("token"));
      formData.append("body", body);
      formData.append("media", file);

      const response = await clientServer.post("/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        return thunkAPI.fulfillWithValue("Post uploaded");
      } else {
        return thunkAPI.rejectWithValue("Post not uploaded");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error creating post");
    }
  }
);

// 🔹 Delete a post
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (post_id, thunkAPI) => {
    try {
      const response = await clientServer.post("/delete_post", {
        token: localStorage.getItem("token"),
        post_id: post_id.post_id, // ensure you pass { post_id: id } when dispatching
      });

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error deleting post");
    }
  }
)
export const incrementPostLike = createAsyncThunk(
  "post/incrementLike",
  async(post,thunkAPI)=>{
    try{
const response = await clientServer.post("/increament_post_like",{
  post_id:post.post_id
})
return thunkAPI.fulfillWithValue(response.data);
    }catch(error){
      return thunkAPI.rejectWithValue(error.response?.data || "like increased");
    }
  }
)
export const getAllCommets = createAsyncThunk("/post/getAllComments",async(postData , thunkAPI)=>{
  try{
 const response = await clientServer.get("/get_comments",{
  params:{post_id:postData.post_id}
 })
 return thunkAPI.fulfillWithValue({
  comments:response.data,
post_id:postData.post_id
 })
  }catch(error){
     return thunkAPI.rejectWithValue(error.response?.data || "all commet get");
  }
})
export const postComment = createAsyncThunk(
  "post/postComment",async(commentData,thunkAPI)=>{
    try{
const response = await clientServer.post('/comment',{
  token:localStorage.getItem("token"),
  post_id:commentData.post_id,
commentBody:commentData.body
})
return thunkAPI.fulfillWithValue(response.data)
    }catch(error){
      return thunkAPI.rejectWithValue("something went wrong")
    }
  }
)
// import { clientServer } from "@/config";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// export const getAllPosts = createAsyncThunk(
//     "post/getAllPosts",

//     async(_,thunkAPI)=>{
//         try{
// const response = await clientServer.get('/posts')
//  return thunkAPI.fulfillWithValue(response.data)
//         }catch(error){
            
//        return thunkAPI.rejectWithValue(error.response.data)
//         }
//     }
// )
// export const createPost = createAsyncThunk(
//     "post/createPost",

//     async(userData,thunkAPI)=>{
//         const{file,body}=userData;
//         try{
// const formData = new FormData();
// formData.append('token',localStorage.getItem('token'))
// formData.append('body',body)
// formData.append('media',file)
// const response = await clientServer.post("/post",formData,{
//     headers:{
//         'Content-Type':'multipart/form-data'
//     }
// })
// if(response.status === 200){
// return thunkAPI.fulfillWithValue("post uploaded")
// }else{
//     return thunkAPI.rejectWithValue("post not uploaded")
// }

//         }catch(error){
            
//        return thunkAPI.rejectWithValue(error.response.data)
//         }
//     }
// )
// export const deletePost = createAsyncThunk(
//     "post/deletePost",

//     async(post_id,thunkAPI)=>{
//         try{

//     data:{token:localStorage.getItem("token")
//         post_id : post_id.post_id
//     }
// }
//  return thunkAPI.fulfillWithValue(response.data)
//         }catch(error){
            
//        return thunkAPI.rejectWithValue(error.response.data)
//         }
//     }
// )