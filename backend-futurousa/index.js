const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Para leer datos en formato JSON

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Backend de FuturoUSA funcionando correctamente!');
});

// Ruta de búsqueda (ficticia por ahora)
app.get('/buscar', (req, res) => {
  const q = req.query.q?.toLowerCase();
  const resultados = [
    'Beca universitaria',
    'Visa estudiantil',
    'Tutoría online',
    'College en NJ',
    'Documentación DACA',
  ].filter(item => item.toLowerCase().includes(q));

  res.json({ resultados });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
