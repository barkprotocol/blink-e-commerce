import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ActionError } from "@solana/actions";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error occurred:", {
    message: err.message,
    path: req.path,
    method: req.method,
    stack: err.stack,
  });

  let errorResponse: ActionError;

  // Handle validation errors from Zod
  if (err instanceof ZodError) {
    errorResponse = {
      message: "Validation failed",
      // Provide details about which fields failed validation
      details: err.errors.map((issue) => ({
        path: issue.path,
        message: issue.message,
      })),
    };
    return res.status(400).json(errorResponse);
  }

  // Handle Solana Action specific errors if applicable
  if (err instanceof ActionError) {
    errorResponse = {
      message: err.message || "An action-specific error occurred",
      code: err.code || "ACTION_ERROR",
    };
    return res.status(400).json(errorResponse); // Or use an appropriate status code
  }

  // Handle all other errors
  errorResponse = {
    message: err.message || "An unexpected error occurred",
  };

  // If no specific error type, respond with 500 status
  res.status(500).json(errorResponse);
};
