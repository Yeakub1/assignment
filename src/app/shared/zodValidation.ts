import { NextFunction, Request, Response } from "express";

const zodValidation = (fn: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn.parseAsync(req?.body);

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default zodValidation;
