import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "192.168.36.151", // Bind to your local IP address
    port: 5174, // Replace with your desired port number
  },
});
