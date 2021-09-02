require('dotenv').config();
const express = require('express')
const app = express();
const rotas = require('./rotas/rotas')

rotas(app)
app.listen(process.env.PORT);