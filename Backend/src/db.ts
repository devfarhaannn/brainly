

import mongoose, {model, Schema} from "mongoose"
import dotenv from 'dotenv'
dotenv.config();
const MONGO_URL = process.env.MONGO_URL as string

mongoose.connect(MONGO_URL)

const UserSchema = new Schema({
    username: {type:String, unique:true},
    password:String
})

export const UserModel = model("User", UserSchema)

const ContentSchema = new Schema({
    title:String,
    link:String,
    type:String,
    tags: {
  type: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  default: []
},

    userId:{type:mongoose.Types.ObjectId, ref:"User", required:true}
})

export const ContentModel = model("Contents",ContentSchema)

const LinkSchema = new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId, ref:"User", unique:true}
})
export const LinkModel = model("Links",LinkSchema)