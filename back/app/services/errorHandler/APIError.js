class APIError extends Error {
    constructor(message, code) {
        super(message);
        // APIError("Mon message", 404)
        this.code = code;
    }
}

module.exports = APIError;