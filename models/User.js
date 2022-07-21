//Importation de mongoose
const mongoose = require('mongoose');
//Importation de mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({ // Schéma de données
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

userSchema.plugin(uniqueValidator); //Appliquer plugin

module.exports = mongoose.model('User', userSchema); // Exporter schéma en tant que modèle Mongoose appelé user