import plugin from "tailwindcss/plugin";

export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Gunplay", "sans-serif"],
        body: ["Libre Franklin", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        body: {
          "@apply mx-auto w-full max-w-screen-2xl bg-neutral-900 font-body font-normal text-white":
            {},
        },
        "h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6": {
          "@apply mb-4 mt-0 font-heading font-bold leading-none": {},
        },

        "h1, .h1": {
          "@apply text-4xl md:text-5xl leading-10": {},
        },

        "h2, .h2": {
          "@apply text-3xl md:text-4xl leading-9": {},
        },

        "h3, .h3": {
          "@apply text-2xl md:text-3xl leading-8": {},
        },

        "h4, .h4": {
          "@apply text-xl md:text-2xl leading-7": {},
        },

        "h5, .h5": {
          "@apply text-lg md:text-xl leading-6": {},
        },

        "h6, .h6": {
          "@apply text-base md:text-lg leading-5": {},
        },

        "button, .button": {
          "@apply rounded px-8 py-3 text-center text-sm font-heading uppercase no-underline cursor-pointer transition-colors duration-300 ease-in-out":
            {},
          "&:disabled, &.disabled": {
            "@apply !cursor-not-allowed !pointer-events-none": {},
          },
        },

        "button.primary, .button.primary": {
          "@apply bg-neutral-600 text-white ": {},
          "&:hover": {
            "@apply bg-neutral-500": {},
          },
          "&:focus, &.selected, &:active": {
            "@apply bg-neutral-500 outline-1 -outline-offset-1": {},
          },
          "&:disabled, &.disabled": {
            "@apply bg-neutral-700 text-neutral-500 ": {},
          },
        },

        "button.secondary, .button.secondary": {
          "@apply bg-transparent text-white outline-white outline-2 -outline-offset-2":
            {},
          "&:hover, &:focus, &.selected, &:active": {
            "@apply outline-white/80": {},
          },
          "&:disabled, &.disabled": {
            "@apply bg-neutral-800 text-neutral-600 outline-neutral-600": {},
          },
        },

        "button.white, .button.white": {
          "@apply bg-white/95 text-black outline-black": {},
          "&:hover, &:focus, &.selected, &:active": {
            "@apply bg-white/80": {},
          },
          "&:disabled, &.disabled": {
            "@apply bg-neutral-300 text-neutral-400": {},
          },
        },

        "button.transparent, .button.transparent": {
          "@apply bg-transparent text-white": {},
          "&:hover, &:focus, &.selected, &:active": {
            "@apply bg-white/10": {},
          },
          "&:disabled, &.disabled": {
            "@apply bg-neutral-800 text-neutral-600": {},
          },
        },

        "label, .label": {
          "@apply flex flex-col text-white mb-2": {},
        },

        "input, .input": {
          "@apply bg-neutral-700 rounded outline outline-white/35 my-1 px-4 py-3 placeholder:text-neutral-600 focus:outline-white/50":
            {},
          "&.error, &:user-invalid": {
            "@apply !bg-rose-100 outline-rose-700 text-rose-700": {},
          },
        },

        "input[type='checkbox'], .checkbox": {
          "@apply w-5 h-5 max-w-5 max-h-5 outline-1 outline-black bg-white rounded cursor-pointer appearance-none box-border p-0 m-0":
            {},
          "&:focus": {
            "@apply outline-1": {},
          },
          "&:checked": {
            "background-image":
              "url(\"data:image/svg+xml,%3csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.2222 6L20 7.71429L10.2222 18L4 12L5.77778 10.2857L10.2222 13.7143L18.2222 6Z' fill='black'/%3e%3c/svg%3e\")",
            "background-size": "100% 100%",
            "background-position": "center",
            "background-repeat": "no-repeat",
          },
        },

        "input[type='radio'], .radio": {
          "@apply w-5 h-5 max-w-5 max-h-5 outline-1 outline-black bg-white rounded-full cursor-pointer appearance-none box-border p-0 m-0":
            {},
          "&:focus": {
            "@apply outline-1": {},
          },
          "&:checked": {
            "@apply bg-black": {},
            "box-shadow": "inset 0 0 0 3px white",
          },
        },

        "textarea, .textarea": {
          "@apply bg-neutral-700 min-h-28 rounded outline outline-white/35 my-1 px-4 py-3 placeholder:text-neutral-600 focus:outline-white/50":
            {},
        },

        "select, .select": {
          "@apply w-full text-white bg-neutral-700 my-1 px-3.5 py-3 outline outline-white/35 rounded transition-all duration-200 ease-in-out":
            {},
          "-webkit-appearance": "none",
          "-moz-appearance": "none",
          "background-image":
            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='gray' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\") !important",
          "background-position": "right 1rem center !important",
          "background-repeat": "no-repeat",
          "background-size": "1.4rem",
          "&:hover": {
            "@apply border-gray-400": {},
          },
          "&:disabled, &.disabled": {
            "@apply bg-neutral-200 text-neutral-600 cursor-not-allowed": {},
          },
          "&.error, &:user-invalid": {
            "@apply bg-rose-100 outline-rose-700 text-rose-700": {},
          },
        },
      });
    }),
  ],
  corePlugins: {
    preflight: true,
  },
};
