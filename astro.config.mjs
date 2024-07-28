import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import sitebenderTheme from "./sitebender.theme.dark.json"

export default defineConfig({
	devToolbar: {
		enabled: false,
	},
	integrations: [
		sitemap({
			canonicalURL: "https://sitebender.dev/",
			filter: (page) => !ignore.includes(page),
			lastmod: new Date(),
		}),
	],
	markdown: {
		shikiConfig: {
			theme: sitebenderTheme,
		},
	},
	site: "https://sitebender.dev/",
})
