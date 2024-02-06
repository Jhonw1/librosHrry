  const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const admin = require('firebase-admin');
const serviceAccount = require('./FireBase/librosbd-3d9cb-firebase-adminsdk-yfmxu-5ca955c014.json');

const port = process.env.port || 8080;

app.use(cors())

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:'https://librosbd-3d9cb-default-rtdb.firebaseio.com/'
})





// Configura tus rutas y controladores aquí
// Ruta para obtener todos los productos
app.get("/", async (req, res) => {
  try{
    const snapshot= (await admin.database().ref('/').once('value')).val()
    res.json(snapshot)
  
  }catch(error){console.log(error);
  res.status(500).json({
    error:('error al conectar')
  })
  }
  
});

// Ruta para agregar un nuevo producto
// router.post('/products', (req, res) => {
//   const { title, stock, price } = req.body;
//   const query = 'INSERT INTO productos (title, stock, price) VALUES (?, ?, ?)';
//   connection.query(query, [title, stock, price], (error, result) => {
//     if (error) {
//       console.error('Error al agregar producto:', error);
//       res.status(500).json({ error: 'Error al agregar producto' });
//     } else {
//       res.json({ message: 'Producto agregado exitosamente' });
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
