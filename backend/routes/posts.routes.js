import { Router } from "express";
import multer from "multer";
import activeCheck, { commentPost, createPost, delete_comment_of_user, deletePost, get_comments_by_posts, getAllPosts, increament_likes } from "../controllers/posts.controller.js";
const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
router.get("/",activeCheck)
router.post("/post",upload.single('media'),createPost)
router.get("/posts",getAllPosts)
router.post("/delete_post",deletePost)
router.post("/comment",commentPost)
router.get("/get_comments",get_comments_by_posts)
router.delete("/delete_comment",delete_comment_of_user)
router.post("/increament_post_like",increament_likes)
export default router;