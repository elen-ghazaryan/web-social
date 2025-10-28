import {Schema, model} from "mongoose"

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true, unique: [true, "Username is busy"] },
  password: { type: String, required: true, minLength: [6, "password is too short"] },
  avatar: { type: String, default: "" },
  isPrivate: { type: Boolean, default: false },
}, { versionKey: false })

export default model("User", userSchema)