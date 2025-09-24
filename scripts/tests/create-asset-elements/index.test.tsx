import { expect } from "@std/expect"

import createAssetElements from "../../build/createAssetElements/index.tsx"

Deno.test("createAssetElements maps css/js and dedupes", () => {
	const assets = [
		"/static/app.css",
		"/static/app.js",
		"https://cdn.example.com/lib.js",
		"//cdn.example.com/lib.css",
		"/static/app.css", // duplicate
	]
	const els = createAssetElements(assets)
	// Deduped length: 4 items
	expect(els.length).toBe(4)

	const htmlish = String(JSON.stringify(els))
	expect(htmlish.includes("rel")).toBe(true)
	expect(htmlish.includes("stylesheet")).toBe(true)
	expect(htmlish.includes("script")).toBe(true)
	expect(htmlish.includes("/static/app.css")).toBe(true)
	expect(htmlish.includes("/static/app.js")).toBe(true)
})

Deno.test("createAssetElements handles protocol-relative and ignores non-css/js", () => {
	const assets = [
		"//cdn.example.com/theme.css",
		"http://example.com/app.js?cache=1",
		"/images/logo.png",
	]
	const els = createAssetElements(assets)
	const htmlish = String(JSON.stringify(els))
	expect(htmlish.includes("theme.css")).toBe(true)
	expect(htmlish.includes("app.js")).toBe(true)
	// PNG should be ignored
	expect(htmlish.includes("logo.png")).toBe(false)
})

Deno.test("createAssetElements ignores paths without extension", () => {
	const assets = [
		"/static/asset", // no extension
		"/static/also/", // trailing slash
	]
	const els = createAssetElements(assets)
	expect(Array.isArray(els)).toBe(true)
	expect(els.length).toBe(0)
})
