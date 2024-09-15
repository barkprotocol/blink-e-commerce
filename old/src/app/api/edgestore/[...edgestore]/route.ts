import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { z } from "zod";

// Initialize EdgeStore
const es = initEdgeStore.create();

// Define the router
const edgeStoreRouter = es.router({
  imageUrlsBlinks: es.imageBucket({
    maxSize: 5 * 1024 * 1024, // 5MB max size
    allowedFormats: ["jpg", "png", "jpeg"], // Restrict formats
  }),
});

// Validate incoming image data using Zod
const ImageUploadSchema = z.object({
  file: z.string(), // This would represent the base64 or file buffer in an actual setup
});

// Create handler for GET and POST
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  async onError(error, req, res) {
    // Handle any errors here
    res.status(500).json({ error: error.message });
  },
  async onBeforeUpload(file, { req, res }) {
    try {
      // Validate the uploaded file before processing
      ImageUploadSchema.parse({ file });
    } catch (error) {
      res.status(400).json({ error: "Invalid file format" });
      return false;
    }
  },
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;
