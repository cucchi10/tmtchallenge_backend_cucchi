class HttpError extends Error {
    constructor(message, statusCode) {
        super(message || "Internal server error")
        this.status = statusCode || 500
    }
}

module.exports = HttpError