import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: __dirname,
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    host: "0.0.0.0", // Bind to your local IP address
    port: 3001, // Replace with your desired port number
  },
});
