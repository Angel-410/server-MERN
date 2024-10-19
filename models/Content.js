// Se llama a mongoose para llamar a las funciones de esquemas
const mongoose = require('mongoose');

// Definimos el esquema y lo invocamos cuando sea llamado en app.js
const contentSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
},
content: {
    type: String,
    required: true,
},
// Puedes agregar los campos que sea, revisa los tipos de BSON para saber qué agregar
});

// El método model de mongoose se encargará de crear la colección tomando una forma plural del nombre del esquema
const Content = mongoose.model('Content', contentSchema);

module.exports = Content;