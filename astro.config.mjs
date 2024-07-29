import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import sitebenderTheme from "./sitebender.theme.dark.json"

const ignore = []

export default defineConfig({
	devToolbar: {
		enabled: false,
	},
	integrations: [
		sitemap({
			canonicalURL: "https://sitebender.org/",
			filter: page => !ignore.includes(page),
			lastmod: new Date(),
		}),
	],
	markdown: {
		shikiConfig: {
			theme: sitebenderTheme,
		},
	},
	outDir: "build",
	output: "static",
	site: "https://sitebender.org/",
})
