import { CustomError } from "./custom-error";

export class BadRequetError extends CustomError {
    statusCode = 400;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequetError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message}]
    }
}