module.exports = {
  darkMode: "class", // ✅ Necesario para activar modo oscuro basado en clases
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // ✅ Detecta componentes dentro de `app/`
    "./components/**/*.{js,ts,jsx,tsx}", // ✅ Detecta archivos en `/components/`
    "./pages/**/*.{js,ts,jsx,tsx}", // ✅ Para asegurar compatibilidad con Next.js
  ],
  theme: {
    extend: {colors: {
        primary: "#4CAF50",
        secondary: "#FFC107",
        accent: "#009688",
        neutral: "#F9F9F9",
        text: "#333333",
        error: "#FF5722",

        // primary: "#e53935",
        // secondary: "fff59d",
        // accent: "#795548",
        // neutral: "#388e3c",
        // text: "#ffc107",
        // error: "#eceff1",

      },},
  },
   safelist: [
    "dark",
    "light",
    "dark:bg-gray-800",
    "dark:text-white",
    "light:bg-white",
    "light:text-black"
  ], // ✅ Forzar Tailwind a incluir estas clases dinámicas
  
  plugins: [],
};