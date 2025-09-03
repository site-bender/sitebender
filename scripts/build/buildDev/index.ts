import createElement from "../../../docs/.sitebender/createElement/index.ts"
import Fragment from "../../../docs/.sitebender/Fragment/index.ts"
import bundleHydrate from "../bundleHydrate/index.ts"
import copyComponentStyles from "../copyComponentStyles/index.ts"
import generatePages from "../generatePages/index.ts"
import transpileComponentScripts from "../transpileComponentScripts/index.ts"
import transpileStaticScripts from "../transpileStaticScripts/index.ts"

export default async function buildDev(): Promise<void> {
	// deno-lint-ignore no-explicit-any
	;(globalThis as any).createElement = createElement // deno-lint-ignore no-explicit-any
	;(globalThis as any).Fragment = Fragment

	console.log("🔨 Copying component styles...")
	await copyComponentStyles()
	await transpileStaticScripts()
	await transpileComponentScripts()
	await bundleHydrate()
	await generatePages()

	// deno-lint-ignore no-console
	console.log("✅ Page build complete!")
}

if (import.meta.main) {
	await buildDev()
}

