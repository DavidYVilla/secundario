/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", //Activa el soporte para el modo obscuro
  theme: {
    extend: {},
  },
  plugins: [],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: "#4CAF50",
        // secondary: "#FFC107",
        // accent: "#009688",
        // neutral: "#F9F9F9",
        // text: "#333333",
        // error: "#FF5722",

        // primary: "#e53935",
        // secondary: "fff59d",
        // accent: "#795548",
        // neutral: "#388e3c",
        // text: "#ffc107",
        // error: "#eceff1",

      },
  
    },
  },
  plugins: [],
}
