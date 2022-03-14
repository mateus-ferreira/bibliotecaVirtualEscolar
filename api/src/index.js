require('dotenv').config();
const express = require('express')
const app = express();
const rotas = require('./rotas/rotas')
const cors = require('cors')
app.use(cors())

rotas(app)
app.listen(process.env.PORT);
//console.log(process.env)