"use client";

import { type EdgeStoreRouter } from "../app/api/edgestore/[...edgestore]/route";
import { createEdgeStoreProvider } from "@edgestore/react";

// Create the EdgeStore provider and hook using the EdgeStoreRouter type
const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>();

// Export the provider and hook for use in your application
export { EdgeStoreProvider, useEdgeStore };
