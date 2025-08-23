require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Inscripcion = require('../modelos/Inscripcion');
const datosPrueba = require('./inscripciones.seed.json');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    await Inscripcion.deleteMany({});
    console.log('🗑️  Datos anteriores borrados');

    await Inscripcion.insertMany(datosPrueba);
    console.log('✅ 20 registros insertados');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al insertar datos:', error);
    process.exit(1);
  }
})();