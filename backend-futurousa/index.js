const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Permitir CORS para todas las peticiones (evita bloqueo entre frontend y backend)
app.use(cors());

// Para que el backend entienda JSON en las peticiones (POST, PUT, etc.)
app.use(express.json());

// Ruta principal para verificar que el servidor está activo
app.get('/', (req, res) => {
  res.send('¡Backend de FuturoUSA funcionando correctamente!');
});

// Ruta de búsqueda simulada
app.get('/buscar', (req, res) => {
  const q = req.query.q?.toLowerCase() || ''; // Obtener consulta y pasar a minúsculas
  const datos = [
    'Beca universitaria',
    'Visa estudiantil',
    'Tutoría online',
    'College en NJ',
    'Documentación DACA',
  ];

  // Filtrar resultados que contengan la consulta
  const resultados = datos.filter(item => item.toLowerCase().includes(q));

  // Enviar resultados en formato JSON
  res.json({ resultados });
});

// Iniciar servidor en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
