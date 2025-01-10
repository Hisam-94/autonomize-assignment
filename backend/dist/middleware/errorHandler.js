"use strict";
// import { Request, Response, NextFunction, RequestHandler } from 'express';
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.ApiError = ApiError;
const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }
    else {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};
exports.errorHandler = errorHandler;
