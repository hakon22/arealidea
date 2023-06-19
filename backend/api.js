const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize('postgres://postgres:hakonpass@localhost:5432/test');

const router = express.Router();

const Tasks = db.define(
  'Tasks',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
);

Tasks.sync();

router.post('/api/tasksAdd', async (req, res) => {
  try {
    const { title, task } = req.body;
    const todo = await Tasks.create({ title, task });
    console.log(todo);
    res.status(200).send(todo);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;

const app = async () => {
  try {
    await db.authenticate();
    console.log('Соединение с БД было успешно установлено');
  } catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e);
  }
};

app();
