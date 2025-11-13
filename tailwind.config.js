/**
 * Tailwind CSS configuration file. The `content` property tells
 * Tailwind where to find markup and component files that reference
 * utility classes. The `extend` object is left empty but can be
 * customized to add additional colors, spacing, etc.
 */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};