require('dotenv').config();
const express = require('express')
const app = express();
const rotas = require('./rotas/rotas')
const path = require('path')
const cors = require('cors')
app.use(cors())

rotas(app)
app.listen(process.env.PORT);