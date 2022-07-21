const express = require('express'); // Importer package express
const mongoose = require('mongoose'); // Importer package mongoose
const path = require('path'); //Donne accès au chemin de notre système de fichier
const xss = require('xss-clean'); // Désinfecte le HTML non fiable (pour empêcher XSS) avec une configuration spécifiée par une liste blanche.
const hpp = require('hpp'); // Protège contre les attaques de pollution des paramètres HTTP
const helmet = require('helmet'); //Définit divers en-têtes HTTP sécurisées
const mongoSanitize = require('express-mongo-sanitize'); //Protège des attaques par injection NoSQL(MongoDB)

const app = express();

//Imporation des différentes routes
const user = require('./routes/user');
const sauceRoutes = require('./routes/sauces');

// Prise en charge du fichier de configuration .env
require("dotenv").config();

// Connexion à bdd MongoDB via mongoose
mongoose.connect(process.env.DatabaseConnexion, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


// Middleware ajout de headers dans l'objet réponse (comme html)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Accès à l'API depuis n'importe quelle origine ( '*' )
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Ajouts headers (Origin, X-Requested-Width etc) aux requêtes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    // Envoie les requêtes avec les méthodes ( GET ,POST , etc.)
    next(); // Renvoie la réponse au client
});

app.use(express.json());

app.use(xss());
app.use(hpp());
app.use(mongoSanitize());
//Protection des en-tetes headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.crossOriginResourcePolicy({
    policy: "same-site"
}));
app.use(helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
}));


app.use("/api/sauces", sauceRoutes);
app.use('/api/auth', user);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;