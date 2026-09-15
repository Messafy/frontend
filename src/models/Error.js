export default class Error {
    constructor(message) {
        this.message = message
    }
    getMessage() {
        return this.message
    }
    toString() {
        return this.message
    }
}