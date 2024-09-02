import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";

// Initialize EdgeStore instance
const es = initEdgeStore.create();

// Define the router with an image bucket for handling image URLs
const edgeStoreRouter = es.router({
  imageUrlsBlinks: es.imageBucket(),
});

// Create a Next.js handler for the router
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST };

// Export the type for the EdgeStore router
export type EdgeStoreRouter = typeof edgeStoreRouter;
