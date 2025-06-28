const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin'); // Importa la librería de Firebase Admin

// --- CONFIGURACIÓN DE FIREBASE ---
// IMPORTANTE: Asegúrate que 'serviceAccountKey.json' esté en la misma carpeta que index.js
// Y que su nombre coincida exactamente con el archivo que descargaste en el Paso 3.
const serviceAccount = require('./serviceAccountKey.json'); 

// Inicializa Firebase Admin SDK con tus credenciales
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // Obtiene una referencia a tu base de datos Firestore

// --- CONFIGURACIÓN DEL SERVIDOR EXPRESS ---
const app = express();
const PORT = 3000;

// Middleware para permitir CORS (Comunicación entre frontend y backend)
app.use(cors());

// Middleware para que Express entienda el formato JSON en las peticiones
app.use(express.json());

// --- RUTAS DE LA API ---

// Ruta principal: Para verificar que el servidor está corriendo
app.get('/', (req, res) => {
  res.send('¡Backend de FuturoUSA funcionando y conectado a Firestore!');
});

// Ruta de búsqueda: Ahora busca datos en Firestore
app.get('/buscar', async (req, res) => {
  const q = req.query.q?.toLowerCase() || ''; // Obtiene la consulta de búsqueda

  // Array para almacenar los resultados
  let resultados = [];

  try {
    // Accede a la colección 'recursos' en tu base de datos Firestore
    // NOTA: Esto trae TODOS los documentos de la colección 'recursos'.
    // Para búsquedas grandes, necesitarías filtros más específicos o soluciones de búsqueda de texto completo.
    const snapshot = await db.collection('recursos').get();

    // Itera sobre cada documento encontrado
    snapshot.forEach(doc => {
      const data = doc.data(); // Obtiene los datos del documento

      // Comprueba si la consulta está en el título o descripción del recurso
      // Puedes añadir más campos si quieres que la búsqueda sea más amplia
      if (data.titulo && data.titulo.toLowerCase().includes(q)) {
        resultados.push(data.titulo); // Añade el título del recurso a los resultados
      } else if (data.descripcion && data.descripcion.toLowerCase().includes(q)) {
        resultados.push(data.descripcion); // Podrías añadir la descripción o ambos
      }
    });

    // Envía los resultados como respuesta JSON
    res.json({ resultados });

  } catch (error) {
    // Manejo de errores si algo sale mal con Firestore
    console.error('Error al realizar la búsqueda en Firestore:', error);
    res.status(500).json({ error: 'Error interno del servidor al buscar.' });
  }
});

// Ruta para el formulario de contacto: Guarda los mensajes en Firestore
app.post('/contacto', async (req, res) => {
  try {
    const { nombre, correo, mensaje } = req.body; // Obtiene los datos del formulario

    // Validar que los campos no estén vacíos
    if (!nombre || !correo || !mensaje) {
      return res.status(400).json({ error: 'Todos los campos del formulario son obligatorios.' });
    }

    // Guarda el mensaje en una nueva colección llamada 'contactMessages' en Firestore
    const docRef = await db.collection('contactMessages').add({
      nombre,
      correo,
      mensaje,
      timestamp: admin.firestore.FieldValue.serverTimestamp() // Añade la fecha/hora del envío
    });

    console.log('Mensaje de contacto guardado con ID:', docRef.id);
    res.status(200).json({ message: 'Mensaje enviado correctamente. ¡Gracias por contactarnos!' });

  } catch (error) {
    console.error('Error al guardar mensaje de contacto en Firestore:', error);
    res.status(500).json({ error: 'Error interno del servidor al enviar mensaje.' });
  }
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
  console.log('¡Conectado a Firestore! Puedes empezar a añadir datos.');
});