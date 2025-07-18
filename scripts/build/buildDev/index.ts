import createElement from "~utilities/createElement/index.ts"
import Fragment from "~utilities/Fragment/index.ts"

import copyComponentStyles from "../copyComponentStyles/index.ts"
import generatePages from "../generatePages/index.ts"

export default async function buildDev(): Promise<void> {
	// deno-lint-ignore no-explicit-any
	;(globalThis as any).createElement = createElement // deno-lint-ignore no-explicit-any
	;(globalThis as any).Fragment = Fragment

	console.log("🔨 Copying component styles...")
	await copyComponentStyles()

	await generatePages()

	// deno-lint-ignore no-console
	console.log("✅ Page build complete!")
}

if (import.meta.main) {
	await buildDev()
}

