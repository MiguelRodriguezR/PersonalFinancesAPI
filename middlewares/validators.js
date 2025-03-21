const { body, validationResult } = require('express-validator');

// Validador para TransactionModel
exports.validateTransaction = [
  body('amount')
    .isNumeric().withMessage('El monto debe ser un número'),
  body('description')
    .notEmpty().withMessage('La descripción es obligatoria'),
  body('date')
    .isISO8601().toDate().withMessage('Se requiere una fecha válida'),
  body('type')
    .notEmpty().withMessage('El tipo es obligatorio'),
  body('categoryId')
    .notEmpty().withMessage('El ID de la categoría es obligatorio'),
  body('status')
    .notEmpty().withMessage('El estado es obligatorio'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  }
];

// Validador para CategoryModel
exports.validateCategory = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio'),
  body('level')
    .isNumeric().withMessage('El nivel debe ser un número'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  }
];

// Validador para TagModel
exports.validateTag = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  }
];

// Validador para AudioEvidenceModel
exports.validateAudioEvidence = [
    body('transactionId')
      .notEmpty().withMessage('El ID de la transacción es obligatorio'),
    body('transcription')
      .notEmpty().withMessage('La transcripción es obligatoria'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      next();
    }
  ];
