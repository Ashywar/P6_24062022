 // import package multer
 const multer = require('multer');

 //dictionnaire pour créer l'extension du fichier à partir du MIMETYPE
 const MIME_TYPES = {
     'image/jpg': 'jpg',
     'image/jpeg': 'jpg',
     'image/png': 'png'
 };

 const storage = multer.diskStorage({ // enregistrer les fichiers entrants :
     destination: (req, file, callback) => { // destination
         callback(null, 'images');
     },
     filename: (req, file, callback) => {
         const name = file.originalname.split(' ').join('_'); //gestion des espaces dans le nom d'origine du fichier
         const extension = MIME_TYPES[file.mimetype];
         callback(null, name + Date.now() + '.' + extension); //créé le filename complet
     }
 });

 module.exports = multer({
     storage: storage
 }).single('image');