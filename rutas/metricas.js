const express = require('express');
const router = express.Router();
const Inscripcion = require('../modelos/Inscripcion');

/* 1️⃣ Cantidad de aprendices por centro de formación */
router.get('/por-centro', async (_req, res) => {
  const resultado = await Inscripcion.aggregate([
    { $group: { _id: '$centroFormacion', total: { $sum: 1 } } },
    { $project: { _id: 0, centro: '$_id', total: 1 } }
  ]);
  res.json(resultado);
});

/* 2️⃣ Instructores recomendados por centro */
router.get('/instructores-por-centro', async (_req, res) => {
  const resultado = await Inscripcion.aggregate([
    { $match: { instructorRecomendado: { $ne: '' } } },
    { $group: { _id: { centro: '$centroFormacion', instructor: '$instructorRecomendado' } } },
    { $project: { _id: 0, centro: '$_id.centro', instructor: '$_id.instructor' } }
  ]);
  res.json(resultado);
});

/* 3️⃣ Aprendices por centro y programa (solo 4 programas) */
router.get('/por-centro-programa', async (_req, res) => {
  const programasPermitidos = ['ADSO', 'Multimedia', 'Redes', 'Desarrollo Web'];
  const resultado = await Inscripcion.aggregate([
    { $match: { programaFormacion: { $in: programasPermitidos } } },
    { $group: { _id: { centro: '$centroFormacion', programa: '$programaFormacion' }, total: { $sum: 1 } } },
    { $project: { _id: 0, centro: '$_id.centro', programa: '$_id.programa', total: 1 } }
  ]);
  res.json(resultado);
});

/* 4️⃣ Aprendices por departamento de residencia */
router.get('/por-departamento', async (_req, res) => {
  const resultado = await Inscripcion.aggregate([
    { $group: { _id: '$departamentoResidencia', total: { $sum: 1 } } },
    { $project: { _id: 0, departamento: '$_id', total: 1 } }
  ]);
  res.json(resultado);
});

/* 5️⃣ Aprendices que reportan usuario de GitHub */
router.get('/con-github', async (_req, res) => {
  const total = await Inscripcion.countDocuments({ usuarioGitHub: { $ne: '' } });
  res.json({ total });
});

/* 6️⃣ Aprendices nivel B1 o B2 por centro */
router.get('/nivel-b1-b2-por-centro', async (_req, res) => {
  const resultado = await Inscripcion.aggregate([
    { $match: { nivelIngles: { $in: ['B1', 'B2'] } } },
    { $group: { _id: '$centroFormacion', total: { $sum: 1 } } },
    { $project: { _id: 0, centro: '$_id', total: 1 } }
  ]);
  res.json(resultado);
});

module.exports = router;