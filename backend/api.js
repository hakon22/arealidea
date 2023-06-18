const express = require('express');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
const db = sequelize;

const router = express.Router();

router.post('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.fetchUserById(id);
    res.status(200).json(user);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
