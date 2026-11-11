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
    proxy: {
      "/api/zcmc-doh-proxy": {
        target: "https://zcmc.doh.gov.ph",
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/api\/zcmc-doh-proxy/, "/"),
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      },
    },
  },
});
