/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
theme: {
  extend: {
    colors: {
      primary: {
        600: '#2563EB',
        900: '#1E40AF'
      },
      accent: {
        purple: '#9333EA',
        amber: '#F59E0B'
      },
      neutral: {
        50: '#F9FAFB',
        500: '#6B7280',
        900: '#111827'
      },
      status: {
        green: '#10B981',
        blue: '#3B82F6',
        violet: '#8B5CF6',
        orange: '#F97316'
      }
    }
  }
},
  plugins: [],
}

