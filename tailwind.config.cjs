/** @type {import('tailwindcss').Config} */
import path from 'path';
import forms from '@tailwindcss/forms';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    forms,  // Using the imported plugin
  ],
}
