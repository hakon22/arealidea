const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const router = express.Router();

const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

const db = new Sequelize(process.env.DB_LOCAL);
// const db = new Sequelize(process.env.DB_HOST);

const Articles = db.define(
  'Articles',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    article: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
);

const connect = async () => {
  try {
    await db.authenticate();
    await Articles.sync();
    console.log('Соединение с БД было успешно установлено');
  } catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e);
  }
};

connect();

router.post('/api/article-add', jsonParser, async (req, res) => {
  try {
    const { title, article } = req.body;
    const todo = await Articles.create({ title, article });
    res.status(200).send(todo);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.delete('/api/article-delete/:id', jsonParser, async (req, res) => {
  try {
    const { id } = req.params;
    await Articles.destroy({ where: { id } });
    res.status(200).sendStatus(201);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/api/article-all', jsonParser, async (req, res) => {
  try {
    const todo = await Articles.findAll();
    res.status(200).send(todo);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
