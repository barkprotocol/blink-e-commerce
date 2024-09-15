import { Request, Response, NextFunction } from "express";
import axios from "axios";

const BARK_SHOP_API_URL = process.env.BARK_SHOP_API_URL;

if (!BARK_SHOP_API_URL) {
  throw new Error("BARK_SHOP_API_URL environment variable is not set");
}

export async function authenticateApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ error: "API key is missing" });
  }

  try {
    // Validate the API key with external service
    const response = await axios.post(
      `${BARK_SHOP_API_URL}/v1/auth/validate-api-key`,
      { apiKey },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 5000, // Set timeout for external request
      }
    );

    if (response?.data?.valid) {
      return next();
    } else {
      return res.status(401).json({ error: "Invalid API key" });
    }
  } catch (error: any) {
    console.error("Error validating API key:", error.message || error, {
      stack: error.stack || 'No stack trace available',
    });

    if (error.response) {
      // Response errors
      const { status, data } = error.response;
      if (status === 404) {
        return res.status(404).json({ error: "API endpoint not found" });
      }
      return res.status(status).json({ error: data.message || "Unknown error" });
    } else if (error.request) {
      // Request errors
      return res.status(500).json({
        error: "No response received from API",
        details: error.message || "Unknown error",
      });
    } else {
      // Other errors
      return res.status(500).json({
        error: "Internal server error during API key validation",
        details: error.message || "Unknown error",
      });
    }
  }
}
