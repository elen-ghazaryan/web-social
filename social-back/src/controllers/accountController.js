import { User, Follow } from "../models/index.js"

class AccountController {
  async getUser (req, res) {
    const { id } = req.params;
    const acc = await User.findById(id).select('-password').lean()
    if(!acc) return res.status(404).send({ message: "Account not found "})

    const followersDocs = await Follow.find({ to: id }).populate('from', '-password');
    const followers = followersDocs.map(flw => flw.from);

    const followingsDocs = await Follow.find({ from: id }).populate('to', '-password');
    const followings = followingsDocs.map(flw => flw.to);
    
    return res.send({ message: "Ok", payload: { account: {...acc, followers, followings}}})
  }

  async searchUsers (req, res) {
    const { text } = req.params

    const users = await User.find({
      $or: [
        { name: { $regex: new RegExp(`^${text}`, "i") } },
        { username: { $regex: new RegExp(`^${text}`, "i") } },
      ],
    }).select("-password");

    res.send({users})
  }

  async follow (req, res) {
    const fromUser = req.user

    const { id } = req.params
    const toUser = await User.findById(id)
    if(!toUser) return res.status(404).send({ message: "Account not found" })


    const exists = await Follow.findOne({ from: fromUser._id, to: id });
    if (exists) return res.status(400).send({ message: "Already following" });

    const approved = !toUser.isPrivate

    try {
      const newFollow = await Follow.create({
        from: fromUser._id,
        to: id,
        approved
      });

      res.status(201).send({ message: "Followed approved", payload: { connection: newFollow } })
    } catch(err) {
      console.error(err)
      res.status(500).send({ message: "Following failed" })
    }
  }

  async unfollow (req, res) {
    const { id } = req.params
    const { _id: fromId } = req.user

    try {
      const result = await Follow.deleteOne({ from: fromId, to: id });

      if (result.deletedCount === 0) {
        return res.status(404).send({ message: "Follow not found" });
      }

      return res.send({ message: "Connection deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Internal server error" });
    }
  }

  async getRequests (req, res) {
    const id = req.user.id

    try {
      const requests = await Follow.find({ to: id, approved: false })
        .populate('from', '-password')

      const result = requests.map(req => ({
        requestId: req._id,
        from: req.from 
      }))
      res.send({ message: 'Ok', payload: { result }})
    } catch(err) {
      console.error(err)
      res.status(500).send({ message: "Internal server error" })
    }
  }

  async acceptRequest (req, res) {
    const requestId = req.params.id
    
    try {
      const updated = await Follow.findByIdAndUpdate(
        requestId,
        { approved: true },
        { new: true }
      );

      if(!updated) return res.status(404).send({ message: "Request not found" })

      res.send({ message: "Request updated", payload: { connection: updated } })
    } catch(err) {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: "Invalid request ID format" })
      }
      res.status(500).send({ message: "Internal server error" })
    }
  }

  async declineRequest (req, res) {
    const requestId = req.params.id
    try {
      const result = await Follow.deleteOne({ _id: requestId })
      if(!result.deletedCount === 0) return res.status(404).send({ message: "Request not found" })

      res.send({ message: "Follow request declined" })
    } catch(err) {
      res.status(500).send({ message: "Internal server error" })
    }
  }
}

export default new AccountController()