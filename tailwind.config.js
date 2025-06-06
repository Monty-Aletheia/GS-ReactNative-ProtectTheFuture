/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          orange_red: "#FF3131",
          soft_orange: "#FF914D"
        }
      },
    },
    plugins: [],
  }