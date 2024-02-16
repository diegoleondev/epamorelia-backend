import { type Response } from "express";
import { type Details } from "../../validators/handler.js";

const response = {
  success(res: Response, data: any, statusCode: number = 200) {
    return res.status(statusCode).json({
      success: true,
      details: {} as unknown as Details,
      data,
      _: true,
    });
  },
  error(res: Response, details: Details, statusCode: number = 500) {
    return res.status(statusCode).json({
      success: false,
      details,
      data: null,
      _: true,
    });
  },
};

export default response;
