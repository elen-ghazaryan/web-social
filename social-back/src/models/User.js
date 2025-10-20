import {Schema, model} from "mongoose"

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true, unique: [true, "Username is busy"] },
  password: { type: String, required: true, minLength: [6, "password is too short"] },
  avatar: { type: String, default: "" },

  //DENORMALIZED VALUES
  followers: { type: Number, default: 0 },
  followings: { type: Number, default: 0 },
  posts: { type: Number, default: 0 }
}, { versionKey: false })

export default model("User", userSchema)