import { defineConfig } from "vite"

import path from "path"

export default defineConfig({
	plugins: [],
	build: {
		manifest: true,
		minify: true,
		outDir: path.join(__dirname, "dist"),
		reportCompressedSize: true,
		root: path.join(__dirname, "lib"),
		sourcemap: true,
		lib: {
			entry: path.resolve(__dirname, "lib/main.js"),
			fileName: "index",
			formats: ["es", "cjs"],
		},
		rollupOptions: {},
	},
	test: {
		setupFiles: ["vitest-localstorage-mock"],
		mockReset: false,
	},
})
