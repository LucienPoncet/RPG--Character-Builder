const debug = require('debug')('app:errorHandler');
const fs = require('fs');
const errorModule = {
    /**
     * Récupère les erreurs
     * @param {*} err - Informations de l'erreur (code, message)
     * @param {*} req - express
     * @param {*} res - express
     * @param {*} next - express
     */
    manage(err, req, res, next) { // 4 arguments obligatoires pour Express car nous sommes dans un middleware de gestion d'erreur.
        // https://expressjs.com/fr/guide/error-handling.html
        // 1. Gerer les erreurs pour les analyser

        // Je creer une constante qui va regrouper toutes les informations que j'ai besoin de stocker pour la résolution et l'analyse de mon application
        const logMessage = `${new Date().toISOString()} | ${err.code} | ${err.message}\n`
        // fs.appendFile crèe un fichier s'il n'existe pas et puis ajouter à la suite (ou au début) le texte envoyé (logMessage)
        fs.appendFile('logs/error.log', logMessage, function (err) { // Je crée un fichier de log qui va contenir mon logMessage. https://www.w3schools.com/nodejs/nodejs_filesystem.asp
            if (err) throw err;
            debug('Saved!');
        });


        // 2. Prévenir les utilisateurs que j'ai eu une erreur
        switch (err.code) {
            case 404:
                debug("Erreur 404", err.message);
                res.status(404).json("Ressource introuvable"); // volontairement en string
                break;
            case 500:
                debug("Erreur 500", err.message); // Message Interne pour l'équipe de Dev uniquement
                res.status(500).json("Erreur interne"); // Externe pour les utilisateurs
                break;
            case "BDD":
                debug("Erreur liée a la BDD", err.message); // Je peux traiter mon information d'erreur au besoin.
                res.status(500).json("Erreur interne");
                break;
            default:
                debug("Erreur inconnue", err.message);
                res.status(500).json("Erreur interne");
        }

    
    }
}

module.exports = errorModule