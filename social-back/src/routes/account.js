import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import accountController from "../controllers/accountController.js";
export const accountRouter = express.Router()


accountRouter.use(isAuthenticated)

//connection between two users
accountRouter.post('/follow/:id', accountController.follow)
accountRouter.delete('/unfollow/:id', accountController.unfollow)
accountRouter.get('/requests', accountController.getRequests)
accountRouter.post('/accept/:id', accountController.acceptRequest)
accountRouter.post('/decline/:id', accountController.declineRequest)

accountRouter.get('/:id', accountController.getUser)
accountRouter.get('/search/:text', accountController.searchUsers)