const JWT = require("./jwt.js");

function isAdmin(req, res, next) {
    const token = req.get("Authorization");

    const { result, error } = JWT.decode(token);

    if (result) {

        if (result.role == 'admin') {
            next();
        }
        else {
            next(new Error("Vous n'avez pas le droit"));
        }
    }
    else {
        next(error);
    }
}

function isMember(req, res, next) {

    const token = req.get("Authorization");

    const { result, error } = JWT.decode(token);

    if (result) {

        if (result.role == 'member' || result.role == 'admin') {
            next();
        }
        else {
            next(new Error("Vous n'avez pas le droit"));
        }
    }
    else {
        next(error);
    }
}

exports.isAdmin = isAdmin;

exports.isMember = isMember;