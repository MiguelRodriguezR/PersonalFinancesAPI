const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const transactionRoutes = require('./routes/transactionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const tagRoutes = require('./routes/tagRoutes');
const audioEvidenceRoutes = require('./routes/audioEvidenceRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(bodyParser.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Set response headers for proper encoding
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Rutas
app.use('/api/transactions', transactionRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/audio-evidences', audioEvidenceRoutes);

// Middleware para el manejo de errores
app.use(errorHandler);

// Conexión a MongoDB (configuración extraída a config/database.js si se desea)
mongoose.connect('mongodb://localhost:27017/transactionsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado a MongoDB');
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
})
.catch(err => console.error(err));
