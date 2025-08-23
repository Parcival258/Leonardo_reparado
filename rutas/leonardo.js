const express = require('express');
const Inscripcion = require('../modelos/Inscripcion');
const router = express.Router();

/*  /leonardo?pregunta=<numero>  */
router.get('/', async (req, res) => {
  const { pregunta } = req.query;

  let resultado;

  switch (pregunta) {
    case '1':
      resultado = await Inscripcion.aggregate([
        { $group: { _id: '$centroFormacion', total: { $sum: 1 } } },
        { $project: { _id: 0, centro: '$_id', total: 1 } }
      ]);
      break;

    case '2':
      resultado = await Inscripcion.aggregate([
        { $match: { instructorRecomendado: { $ne: '' } } },
        { $group: { _id: { centro: '$centroFormacion', instructor: '$instructorRecomendado' } } },
        { $project: { _id: 0, centro: '$_id.centro', instructor: '$_id.instructor' } }
      ]);
      break;

    case '3':
      resultado = await Inscripcion.aggregate([
        { $match: { programaFormacion: { $in: ['ADSO', 'Multimedia', 'Redes', 'Desarrollo Web'] } } },
        { $group: { _id: { centro: '$centroFormacion', programa: '$programaFormacion' }, total: { $sum: 1 } } },
        { $project: { _id: 0, centro: '$_id.centro', programa: '$_id.programa', total: 1 } }
      ]);
      break;

    case '4':
      resultado = await Inscripcion.aggregate([
        { $group: { _id: '$departamentoResidencia', total: { $sum: 1 } } },
        { $project: { _id: 0, departamento: '$_id', total: 1 } }
      ]);
      break;

    case '5':
      resultado = { total: await Inscripcion.countDocuments({ usuarioGitHub: { $ne: '' } }) };
      break;

    case '6':
      resultado = await Inscripcion.aggregate([
        { $match: { nivelIngles: { $in: ['B1', 'B2'] } } },
        { $group: { _id: '$centroFormacion', total: { $sum: 1 } } },
        { $project: { _id: 0, centro: '$_id', total: 1 } }
      ]);
      break;

    default:
      return res.status(400).json({ error: 'Pregunta no válida (1-6)' });
  }

  res.json(resultado);
});

module.exports = router;