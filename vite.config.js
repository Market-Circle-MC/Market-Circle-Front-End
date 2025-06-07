import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

//https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/Market-Circle/",
  build: {
    rollupOptions: {
<<<<<<< HEAD
      external: ["react-router-dom"],
=======
      external: ["react-router-dom", "iconsax-react"],
>>>>>>> 9573da3 (Market Circle features)
    },
  },
});
