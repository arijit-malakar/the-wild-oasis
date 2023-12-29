import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://the-wild-oasis-api.vercel.app/
// http://localhost:3000
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/uploads": "http://localhost:3000",
    },
  },
  plugins: [react()],
});
