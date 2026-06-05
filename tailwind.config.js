/** @type {import('tailwindcss').Config} */
//
// PALETTE ISTITUZIONALE ALPERIA
// Fonte: «[Alperia] Palette Colori (1).pdf» — colori core con contrasto AA ≥ 4.5:1.
//   • Primario   · Blu       #006593 (AA 6.39)
//   • Secondario · Turchese  #1D7990 (AA 5.01)
//   • Accento/CTA· Arancione #DB3700 (AA 4.60)
//   • Statuses   · Errore / Avviso / Successo (scale derivate)
//
// Le scale 50→950 sono derivate dai core ancorati allo step 600.
// Per re-skinnare l'intero artifact senza toccare ogni classe, le famiglie
// Tailwind usate nei componenti sono rimappate sui colori Alperia:
//   teal→Blu primario · cyan→Turchese · amber/orange→Arancione (accento/CTA)
//   emerald→Successo · rose/red→Errore · yellow→Avviso
//
const blu       = { 50: '#EBF3F6', 100: '#D6E6EE', 200: '#ADCEDC', 300: '#80B2C9', 400: '#4790B1', 500: '#1F77A0', 600: '#006593', 700: '#01577F', 800: '#034768', 900: '#043751', 950: '#06273A' };
const turchese  = { 50: '#EDF4F6', 100: '#DBEAED', 200: '#B7D4DB', 300: '#8EBCC8', 400: '#5C9FAF', 500: '#38899D', 600: '#1D7990', 700: '#1A687C', 800: '#165466', 900: '#124050', 950: '#0E2D39' };
const arancione = { 50: '#FCEFEB', 100: '#F9DFD6', 200: '#F3BFAD', 300: '#ED9B80', 400: '#E56F47', 500: '#DF4F1F', 600: '#DB3700', 700: '#B93003', 800: '#932807', 900: '#6D210A', 950: '#47190E' };
const errore    = { 50: '#FAEFEE', 100: '#F5DFDD', 200: '#EBC0BB', 300: '#E09C95', 400: '#D27066', 500: '#C85144', 600: '#C0392B', 700: '#A33227', 800: '#812A23', 900: '#60221F', 950: '#3F1A1B' };
const successo  = { 50: '#F1F5EE', 100: '#E3EADE', 200: '#C6D5BC', 300: '#A6BE96', 400: '#80A169', 500: '#638D47', 600: '#4E7D2E', 700: '#436B2A', 800: '#365725', 900: '#2A4220', 950: '#1D2E1C' };
const avviso    = { 50: '#FBF6EB', 100: '#F6ECD6', 200: '#EEDAAD', 300: '#E4C480', 400: '#D8AB47', 500: '#CF981F', 600: '#C98A00', 700: '#AA7603', 800: '#875F07', 900: '#65480A', 950: '#42320E' };

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
        // Token istituzionali Alperia (uso esplicito)
        'alperia-blu': '#006593',
        'alperia-turchese': '#1D7990',
        'alperia-arancione': '#DB3700',
        // Scale complete
        'blu': blu,
        'turchese': turchese,
        'arancione': arancione,
        // Re-mapping famiglie Tailwind → colori Alperia
        teal: blu,           // primario (accento dominante UI)
        cyan: turchese,      // secondario
        amber: arancione,    // accento / CTA
        orange: arancione,   // accento / CTA (alias)
        emerald: successo,   // status successo
        rose: errore,        // status errore
        red: errore,         // status errore
        yellow: avviso,      // status avviso
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
