import { User } from "../models/index.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { env } from "../config/env.js";

class UserController{
  async signup (req, res) {
    let { name, surname, username, password } = req.body || {};
    if(!name?.trim() || !surname?.trim() || !username?.trim() || !password?.trim()) {
      res.status(400).send({ message: "Missing fields. All fields are required." })
    }

    try {
      password = await bcrypt.hash(password, 10)
      
      const user = await User.create({ name, surname, username, password })
      return res.status(201).send({ message: "User successfully created", payload: { id: user.id }})
    } catch(err) {
      return res.status(400).send({ message: err.message })
    }
  }

  async login(req, res) {
    if(!req.body) return res.status(400).send({ message: "Missing request body." })
    const { username, password } = req.body

    if(!username?.trim() || !password?.trim()) {
      res.status(400).send({ message: "Missing fields. Both username and password are required." })
    }

    const user = await User.findOne({ username })
    if(!user) return res.status(404).send({ message: "User not found" })

    const isCorrect = await bcrypt.compare(password, user.password)
    if(!isCorrect) {
      return res.status(401).send({ message: "Wrong credentials." })
    }

    const token = jwt.sign(
      {id: user._id},
      env.JWT_SECRET,
      {expiresIn: '7d'}
    )

    return res.send({success: true, message: "Successfully logined", payload: { token } })
  }

  async getUser(req, res) {
    const userData = req.user.toObject();
    delete userData.password;
    
    res.send({ message: "Ok", payload : { userData } })
  }

  async updateUsername (req, res) {
    let { username, password } = req.body || {};
    if(!username?.trim() || !password?.trim()) {
      return res.status(400).send({ message: "Missing fields. All fields are required." })
    }

    const user = req.user
    const isCorrect = await bcrypt.compare(password, user.password)
    if(!isCorrect) {
      return res.status(400).send({ message: "Incorrect credentials." })
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send({ message: "Username is already taken." });
    }

    try {
      await User.updateOne(
        {_id: user._id}, 
        {$set: {username} })
      res.send({ message: "Successfully update" })
    } catch(err) {
      console.error(err)
      return res.status(500).send({ message: "Internal server error." })
    }
  }

  async uploadAvatar(req, res) {
    if(!req.file) return res.status(400).send({ message: "File is not provided" })
    const id = req.user._id
    const user = await User.findById(id)
    user.avatar = req.file.filename
    await user.save()
    res.send({ message: "Successfully updated", payload: { picture: req.file.filename }})
  }

  async switchPrivacy(req, res) {
    const user = await User.findById(req.user._id)
    user.isPrivate = !user.isPrivate
    await user.save()

    res.send({ message:`Now your account is ${user.isPrivate ? 'private' : 'public'}`, payload: { isPrivate: user.isPrivate }})
  }
}

export default new UserController()