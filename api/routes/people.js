// routes/people.js
import express from 'express';
import { UserModel } from '../models/User.js';// Adjust the path based on your file structure

const router = express.Router();

// Define the people route
router.get("/", async (req, res) => {
  const users = await UserModel.find({}, { _id: 1, username: 1 });
  res.json(users);
});

export default router;
