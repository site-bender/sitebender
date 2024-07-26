import { defineConfig } from "vite"

import path from "path"

export default defineConfig({
	plugins: [],
	build: {
		manifest: true,
		minify: true,
		outDir: path.join(__dirname, "dist"),
		reportCompressedSize: true,
		root: path.join(__dirname, "src"),
		sourcemap: true,
		lib: {
			entry: path.resolve(__dirname, "src/main.js"),
			fileName: "index",
			formats: ["es", "cjs"],
		},
		rollupOptions: {},
	},
})
