import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "build", 
    rollupOptions: {
      output: {
        // Manual chunking to split vendor code from application code
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Group react and react-dom separately
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendors";
            }
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust chunk size warning limit
  },
}));
