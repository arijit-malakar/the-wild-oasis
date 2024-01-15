import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": "https://the-wild-oasis-api.onrender.com",
      "/uploads": "https://the-wild-oasis-api.onrender.com",
    },
  },
  plugins: [react()],
});
