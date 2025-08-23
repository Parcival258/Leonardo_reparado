require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const rutasMetricas = require('./rutas/metricas');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error conectando Mongo', err));

app.use('/metricas', rutasMetricas);

const PUERTO = process.env.PORT || 8080;
app.listen(PUERTO, () => console.log(`🚀 Servidor corriendo en http://localhost:${PUERTO}`));

//con esto leonardo debe poder entrar a la ruta
const leonardoRoute = require('./rutas/leonardo');
app.use('/leonardo', leonardoRoute);