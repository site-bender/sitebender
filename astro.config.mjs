import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import sitebenderTheme from "./sitebender.theme.dark.json"
import vercelServerless from "@astrojs/vercel/serverless"

export default defineConfig({
	adapter: vercelServerless({
		imageService: true,
	}),
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
	output: "server",
	site: "https://sitebender.org/",
})
