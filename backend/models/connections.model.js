import mongoose from "mongoose";
const connectRequest = new mongoose.Schema({
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    connectionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status_accepted : {
        type : Boolean,
        default:null,
    }
})
const ConnectRequest = mongoose.model("ConnectRequest",connectRequest);
export default ConnectRequest;