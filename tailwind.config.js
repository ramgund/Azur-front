/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Estrutura padrão do Next.js (pasta app)
    './components/**/*.{js,ts,jsx,tsx}', // Componentes reutilizáveis
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
