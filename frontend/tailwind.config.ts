import type { Config } from "tailwindcss";

const config: Config = {
	// mode: 'jit',
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			animation: {
				"spin-slow": "spin 2s linear infinite",
			},
		},
	},
	plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
export default config;
