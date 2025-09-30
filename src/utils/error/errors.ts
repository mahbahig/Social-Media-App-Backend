import { AppError } from "./app-error";

export class ConflictException extends AppError {
    constructor(message: string) {
        super(message, 409);
    }
}

export class BadRequestException extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}
export class UnauthorizedException extends AppError {
    constructor(message: string) {
        super(message, 401);
    }
}

export class NotFoundException extends AppError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class ValidationException extends AppError {
    constructor(message: string, details?: Object[]) {
        super(message, 422, details);
    }
}

export class ForbiddenException extends AppError {
    constructor(message: string) {
        super(message, 403);
    }
}