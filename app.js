//Paquetes utilizados
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Content = require('./models/Content.js'); // Incluimos nuestra nuevo esquema definido

const app = express(); // Setup del server
const PORT = 4000; // Puerto a utilizar en nuestro servidor

// Utilizaremos el Middleware para hacer parsing de los JSON
app.use(express.json());
app.use(cors());

// URI para la conexión a nuestro cliente de MongoDB
const mongoURI = process.env.mongo_URI; 
// Es necesario verificar que el puerto se alinee con el que se estableció en la conexión de Compass

// Conexión de mongoose a la conexión establecida en MongoDB Compass
// const URL ='mongodb+srv://Aang2008:<db_password>@clustera.74cfl.mongodb.net/?retryWrites=true&w=majority&appName=ClusterA'

mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Método POST para nuestro servidor (Insertar un nuevo contenido)
app.post('/content', async (req, res) => {
const { name, content } = req.body;

try {
const newContent = new Content({ name, content });
await newContent.save();
res.status(201).send(newContent);
} catch (err) {
res.status(400).send(err);
}
});

// Método GET para nuestro servidor (mirar todos los contenidos)
app.get('/content', async (req, res) => {
try {
const contents = await Content.find();
res.status(200).send(contents);
} catch (err) {
res.status(500).send(err);
}
});

// Inicializar el servidor en el puerto definido
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});