import createElement from "~utilities/createElement/index.ts"
import Fragment from "~utilities/Fragment/index.ts"

import bundleHydrate from "./bundleHydrate/index.ts"
import copyComponentStyles from "./copyComponentStyles/index.ts"
import copyStaticAssets from "./copyStaticAssets/index.ts"
import generatePages from "./generatePages/index.ts"
import transpileComponentScripts from "./transpileComponentScripts/index.ts"
import transpileStaticScripts from "./transpileStaticScripts/index.ts"

export default async function buildComplete(): Promise<void> {
	// deno-lint-ignore no-explicit-any
	;(globalThis as any).createElement = createElement
	// deno-lint-ignore no-explicit-any
	;(globalThis as any).Fragment = Fragment

	await copyStaticAssets()
	await transpileStaticScripts()
	await copyComponentStyles()
	await transpileComponentScripts()
	await bundleHydrate()
	await generatePages()
}

if (import.meta.main) {
	await buildComplete()
}
