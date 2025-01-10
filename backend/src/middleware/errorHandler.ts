// import { Request, Response, NextFunction, RequestHandler } from 'express';

// export class ApiError extends Error {
//   statusCode: number;
  
//   constructor(statusCode: number, message: string) {
//     super(message);
//     this.statusCode = statusCode;
//   }
// }

// export const errorHandler = (
//   err: Error | ApiError,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (err instanceof ApiError) {
//     return res.status(err.statusCode).json({
//       success: false,
//       message: err.message
//     });
//   }

//   return res.status(500).json({
//     success: false,
//     message: 'Internal Server Error'
//   });
// };

import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export class ApiError extends Error {
  statusCode: number;
  
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler: ErrorRequestHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {  // Changed return type to void
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({  // Removed return
      success: false,
      message: err.message
    });
  } else {
    res.status(500).json({  // Removed return
      success: false,
      message: 'Internal Server Error'
    });
  }
};