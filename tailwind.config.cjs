/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primOrange: "#FF3B0E",
        overlay: "rgb(0, 0, 0, 0.5)",
        lightOrange: "#FCE3C8",
        creamBg: "#FFFAF6",
        emailNum: 'rgba(0, 0, 0, 0.30)'
      },

      fontFamily: {
        grotesk: "Space Grotesk",
        cascadiaMono : 'Cascadia Mono',
        franklinGoth: 'Franklin Gothic Book'
      },

      screens: {
        "-1100": { max: "1100px" },
        "-1000": { max: "1000px" },
        "-950": { max: "950px" },
        "-850": { max: "850px" },
        "-800": { max: "800px" },
        "-750": { max: "750px" },
        "-500": { max: "500px" },
        "-450": { max: "450px" },
        "-300": { max: "300px" },
      },

      boxShadow: {
        toggle: "0px 6px 8px 3px rgba(0, 0, 0, 0.10) inset",
      },
    },
  },
  plugins: [],
};
