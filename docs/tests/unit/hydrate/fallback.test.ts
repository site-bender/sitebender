import { assertEquals } from "jsr:@std/assert"

Deno.test("viz hydration falls back to noop when no adapter is set", async () => {
	// Save previous globals
	const g = globalThis as unknown as Record<string, unknown>
	const prevDoc = g.document
	const prevWin = g.window

	// Minimal fake elements and document
	const els: Array<{ dataset: Record<string, string> }> = [
		{ dataset: {} },
		{ dataset: {} },
	]

	const fakeDocument = {
		readyState: "complete",
		getElementById: (_: string) => null,
		querySelectorAll: (_: string) => els,
		addEventListener: (_: string, __: unknown) => void 0,
	} as unknown as Document // Install fakes
	;(g as any).document = fakeDocument
	;(g as any).window = {}

	// Dynamically import hydrate entry so it sees our fake document
	const modUrl = new URL("../../../src/hydrate/adaptive.ts", import.meta.url)
	await import(modUrl.href)

	// No registry adapter was set, so the noop adapter should have marked elements
	for (const el of els) {
		assertEquals(el.dataset.vizHydrated, "true")
	} // Restore globals

	;(g as any).document = prevDoc
	;(g as any).window = prevWin
})
