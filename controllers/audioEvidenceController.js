const AudioEvidence = require('../models/AudioEvidence');

exports.createAudioEvidence = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'El archivo de audio es requerido' });
    }
    const newEvidence = new AudioEvidence({
      transactionId: req.body.transactionId,
      audioPath: req.file.path, // Se utiliza el path asignado por multer
      transcription: req.body.transcription,
      createdAt: req.body.createdAt || Date.now(),
    });
    await newEvidence.save();
    res.status(201).json(newEvidence);
  } catch (err) {
    next(err);
  }
};

exports.getAudioEvidences = async (req, res, next) => {
  try {
    const evidences = await AudioEvidence.find();
    res.json(evidences);
  } catch (err) {
    next(err);
  }
};
