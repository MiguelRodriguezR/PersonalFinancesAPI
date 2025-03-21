const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'media/' }); // Configuración para guardar archivos en la carpeta "media"
const { createAudioEvidence, getAudioEvidences } = require('../controllers/audioEvidenceController');
const { validateAudioEvidence } = require('../middlewares/validators');

router.post('/', upload.single('audio'), validateAudioEvidence, createAudioEvidence);
router.get('/', getAudioEvidences);

module.exports = router;
