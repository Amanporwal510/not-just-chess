import express from 'express'
const router = express.Router()

import User from '../server/database/schema/user.js'
import { isLoggedIn } from '../server/middleware'

router.post('/api/challenge', isLoggedIn, async (req, res) => {
   // console.log(req.body)
   const { opponentEmail, gameId, myEmail, opponentName, isWhite } = req.body;
   const user = await User.findOne({email: opponentEmail})
   user.challenge.unshift({
      opponentEmail: myEmail, 
      opponentName,
      gameId,
      isWhite
   })
   await user.save()
})

router.get('/api/challenge', isLoggedIn, async (req, res) => {
   // console.log(req.user._id)
   const user = await User.findById(req.user._id)
   res.status(200).send(user.challenge)
})

router.patch('/api/challenge/:challengeId', async (req, res) => {
   const { challengeId } = req.params
   // console.log(challengeId)
   const user = User.findById(req.user._id)
   await user.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { challenge: { _id: challengeId } } },
      { safe: true, multi: false }
    );
    return res.status(200).json({ message: "Album Deleted Successfully" });
})

module.exports = router