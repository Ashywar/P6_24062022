const bcrypt = require("bcrypt");

const User = require("../models/User");

const jwt = require("jsonwebtoken");

require("dotenv").config();

//Fonction signup
exports.signup = (req, res, next) => {
    //Utilisation de bcrypt pour le hash du password
    bcrypt
        .hash(req.body.password, 10) // fonction hasher/crypter un mdp, 10 tours pour créer un mdp safe (pas trop de salt)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            user
                .save()
                .then(() =>
                    res.status(201).json({
                        message: "Utilisateur créé !",
                    })
                )
                .catch((error) =>
                    res.status(400).json({
                        error,
                    })
                );
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error,
            });
        });
};

//Fonction login
exports.login = (req, res, next) => {
    console.log(req.body)
    User.findOne({
            email: req.body.email,
        })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    error: "Utilisateur non trouvé !",
                });
            }
            //Utilisation de bcrypt pour le hash du password
            //Compare avec bcrypt le password de la requête et celui dans MongoDB
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: "Mot de passe incorrect !",
                        });
                    }
                    res.status(200).json({
                        //renvoie _ID généré par MongoDB
                        userId: user._id,
                        // renvoie Token d'auth
                        token: jwt.sign({
                                //données à encoder (=payload)
                                userId: user._id,
                            },
                            //clé secrète pour l'encodage
                            process.env.Token, {
                                // durée de validité du TOKEN
                                expiresIn: "24h",
                            }
                        ),
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({
                        error,
                    });
                });
        })
        .catch((error) => {
            res.status(200).json({
                error,
            });
        });
};