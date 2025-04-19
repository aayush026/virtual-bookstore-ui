/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html",
    ],
    theme: {
      extend: {
        colors: {
          // You can add custom colors for your bookstore here
          'book-primary': '#4a5568',
          'book-secondary': '#718096',
          'book-accent': '#f56565',
        },
        fontFamily: {
          // Add custom fonts if needed
          'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
          'serif': ['Georgia', 'Cambria', 'serif'],
        },
        boxShadow: {
          'book': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    plugins: [],
  }