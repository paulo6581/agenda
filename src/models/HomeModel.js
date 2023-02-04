const mongoose = require('mongoose');

// Tudo no Mongoose começa com um Schema. Cada esquema é mapeado para uma coleção do MongoDB e define a forma dos documentos dentro dessa coleção.
const HomeSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    descricao: String
});

// criando o Model
const HomeModel = mongoose.model('Home', HomeSchema);

// validar os dados
class Home {

}

module.exports = Home;