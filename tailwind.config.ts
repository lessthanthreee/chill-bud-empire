import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				chill: {
					emerald: {
						DEFAULT: '#317039',
						50: '#317039',
						100: '#2C6332',
						200: '#265E2C',
						300: '#215A27',
						400: '#1C5621',
						500: '#17521C',
						600: '#124E16',
						700: '#0D4A11',
						800: '#08460B',
						900: '#034206'
					},
					yellow: {
						DEFAULT: '#F1BE49',
						50: '#FFF1D4',
						100: '#FFEBC0',
						200: '#FFE5A8',
						300: '#FFDF90',
						400: '#FFD978',
						500: '#F1BE49',
						600: '#D9A631',
						700: '#C18E1A',
						800: '#A97C02',
						900: '#916A00'
					},
					white: {
						DEFAULT: '#F8EDD9',
						50: '#FFFFFF',
						100: '#F8EDD9',
						200: '#F0DBC1',
						300: '#E8C9A9',
						400: '#E0B791',
						500: '#D8A579',
						600: '#D09361',
						700: '#C88149',
						800: '#C06F31',
						900: '#B85D19'
					},
					red: {
						DEFAULT: '#CC4B24',
						50: '#EBBAA4',
						100: '#E3A08C',
						200: '#DB8674',
						300: '#D36C5C',
						400: '#CC4B24',
						500: '#B4420E',
						600: '#9C3900',
						700: '#843000',
						800: '#6C2700',
						900: '#541E00'
					},
					papaya: {
						DEFAULT: '#FFF1D4',
						50: '#FFFFFF',
						100: '#FFF1D4',
						200: '#FFEBC0',
						300: '#FFE5AC',
						400: '#FFDF98',
						500: '#FFF1D4',
						600: '#F9D9BC',
						700: '#F3C1A4',
						800: '#EDA98C',
						900: '#E79174'
					},
					cosmic: {
						DEFAULT: '#FFFBEB',
						50: '#FFFFFF',
						100: '#FFFBEB',
						200: '#FFF5D3',
						300: '#FFEFBB',
						400: '#FFE9A3',
						500: '#FFFBEB',
						600: '#F7EDD3',
						700: '#EFDFBB',
						800: '#E7D1A3',
						900: '#DFC38B'
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
