const express = require('express'); // import express
const router = express.Router(); // crée routeur express

//Importation de auth pour la sécurité des routes
const auth = require('../middleware/auth');

//Imporation de multer pour les images
const multer = require('../middleware/multer-config');

//Imporatation du controller des sauces
const saucesCtrl = require('../controllers/sauces');

router.get('/', auth, saucesCtrl.getSauces);
router.get('/:id', auth, saucesCtrl.getSauceById);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', auth, multer, saucesCtrl.updateSauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.post("/:id/like", auth, saucesCtrl.likeDislikeSauces);



module.exports = router;