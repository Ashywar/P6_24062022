const passwordSchema = require("../models/password");

//exporte le middleware
module.exports = (req, res, next) => {

    if (!passwordSchema.validate(req.body.password)) {
        res.status(401).json({
            error: new Error(`Le mot de passe doit contenir au moins 7 caractères, des minuscules et majuscules, un chiffre, et pas d'espace !`)
        });

    } else {
        next();
    }
};