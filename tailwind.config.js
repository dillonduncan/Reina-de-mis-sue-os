/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            magia:{
                sky:{
                    100:'#def7ff', 
                    200:'#bceeff',
                    300:'8fe3ff',
                    400:'#53d4ff',
                    500:'#0cb7f2',
                },
                red:{
                    100:'#ff7676',
                    200:'#ff4040',
                    300:'#ff0000',
                    400:'#e00000',
                    500:'#c20000',
                },
                pink:{
                    50:'#FFB6C1',
                    100:'#FFA2BC',
                    200:'#FF8DAD',
                    300:'#FB72A4',
                    400:'#FB5CA1',
                    500:'#D64085',
                    600:'#AA336A',
                },
                gold:'#efb810',
                dark:'#050b14',
            }
        },
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
            script: ['Dancing Script', 'cursive'],
        }
    },
  },
  plugins: [],
}