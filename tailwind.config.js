/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  safelist: [
    // Dynamic color classes used in tier cards, icon backgrounds, etc.
    'bg-teal-50', 'bg-orange-50', 'bg-amber-50', 'bg-rose-50', 'bg-red-50', 'bg-emerald-50',
    'text-teal-700', 'text-orange-700', 'text-amber-700', 'text-rose-700', 'text-red-700', 'text-emerald-700',
    'text-teal-300', 'text-orange-300', 'text-amber-300', 'text-rose-300', 'text-emerald-300',
    'bg-teal-400', 'bg-amber-400', 'bg-slate-400', 'bg-orange-400',
    'bg-teal-900', 'bg-orange-900', 'bg-amber-900',
    'border-teal-500/30', 'border-orange-500/30', 'border-amber-500/30',
    'bg-teal-900/60', 'bg-orange-900/40', 'bg-amber-900/40',
  ],
  theme: {
    extend: {
      colors: {
        // Alperia più palette
        'midnight': '#020617',
        'dolomite-teal': '#2EB5BC',
        'alpine-gold': '#E8B842',
        'warm-white': '#F7F4EE',
        'signal-coral': '#E97062',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
