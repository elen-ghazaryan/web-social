import mongoose, { model } from "mongoose";


const followSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  approved: Boolean

})

export default model("Follow", followSchema)