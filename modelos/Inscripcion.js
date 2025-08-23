const { Schema, model } = require('mongoose');

const InscripcionSchema = new Schema({
  nombreCompleto:        { type: String, required: true },
  centroFormacion:       { type: String, required: true },
  programaFormacion:     { type: String, required: true },
  departamentoResidencia:{ type: String, required: true },
  usuarioGitHub:         { type: String, default: '' },
  nivelIngles:           { type: String, enum: ['A1','A2','B1','B2','C1','C2'] },
  instructorRecomendado: { type: String, default: '' }
}, { collection: 'inscripciones' });

module.exports = model('Inscripcion', InscripcionSchema);