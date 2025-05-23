/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryColor: "#333333",
        greenColor: "#008B4C",
        secondaryColor: "#ecf0f1",
        accentColor: "#ED1C24",
        textColor: "#2c3e50"
      },
      fontFamily: {
        noto: ['var(----font-noto)'],
      },
    },
  },
  plugins: [require("daisyui")],
};
