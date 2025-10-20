import jwt from "jsonwebtoken"
import { env } from "../config/env.js";
import { User } from "../models/index.js";

export const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No Bearer token provided." })
  }

  const token = authHeader.split(" ")[1]

  try {
    const {id: decodedID} = jwt.verify(token, env.JWT_SECRET)
    const user = await User.findById(decodedID)
    req.user = user;
    next()
    
  } catch (err) {
    return res.status(403).send({ message: "Invalid or expired token." })
  }
}