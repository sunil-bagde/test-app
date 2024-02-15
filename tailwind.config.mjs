const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-1": "#041324",
        "primary-2": "#2a4562",
        "primary-3": "#ced4da",
        "primary-4": "#8c68cd",
        "primary-5": "#878a99",
      },
    },
  },
  plugins: [],
};
export default config;
