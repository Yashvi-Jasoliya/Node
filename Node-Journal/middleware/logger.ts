import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction): void => {
    const timestamp = new Date().toString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next(); 
};

export default logger;


