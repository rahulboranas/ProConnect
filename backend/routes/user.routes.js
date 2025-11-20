import { Router } from "express";
import register, { acceptConnectionnRequest, downloadProfile, getAllUserProfile, getMyConnectionRequests, getUserAndProfile, getUserProfileAndUserBasedOnUsername, login, sendConnectionRequest, updateProfileData, updateUserProfile, uploadProfilePicture, whatAreMyConnections } from "../controllers/user.controller.js";
import multer from "multer";
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


router.post("/register", register);
router.post("/login", login);
router.post("/update_profile_picture", upload.single("profile_picture"), uploadProfilePicture);
router.post("/user_update",updateUserProfile)
router.post("/get_user_and_profile",getUserAndProfile)
router.post("/update_profile_data",updateProfileData)
router.get("/user/get_all_users",getAllUserProfile)
router.get("/user/download_resume",downloadProfile)
router.post("/user/send_connection_request",sendConnectionRequest)
router.get("/user/getConnectionRequests",getMyConnectionRequests)
router.get('/user/user_connection_request',whatAreMyConnections)
router.post('/user/accept_connection_request',acceptConnectionnRequest)
router.get('/user/get_profile_based_on_username',getUserProfileAndUserBasedOnUsername)
export default router;
