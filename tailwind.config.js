import plugin from "tailwindcss/plugin";

export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gunplay: ["Gunplay", "sans-serif"],
        libre: ["Libre Franklin", "sans-serif"],
      },
      gridTemplateColumns: {
        thin: "3rem 1fr 3rem",
        slim: "0.25fr 1fr 0.25fr",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        body: {
          "@apply flex flex-col justify-between bg-neutral-900 font-libre text-lg font-normal leading-6 text-white":
            {},
        },
        "h1, h2, h3, h4, h5, h6": {
          "@apply mb-4 mt-0 font-gunplay font-bold leading-none": {},
        },
      });
    }),
  ],
  corePlugins: {
    preflight: true,
  },
};
