export class AppError extends Error {
    constructor(public message: string, public statusCode?: number, public details?: Object[]) {
        super(message);
    }
};