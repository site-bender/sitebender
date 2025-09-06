import { assertEquals } from "jsr:@std/assert"

Deno.test("docs hydrate strips data-ir-id in non-local environments", async () => {
	const g = globalThis as unknown as Record<string, unknown>
	const prevDoc = g.document
	const prevWin = g.window
	const prevLoc = (g as any).location

	// Fake nodes
	const irNodes: Array<
		{ removed: string[]; removeAttribute: (n: string) => void }
	> = [
		{
			removed: [],
			removeAttribute(name: string) {
				this.removed.push(name)
			},
		},
		{
			removed: [],
			removeAttribute(name: string) {
				this.removed.push(name)
			},
		},
	]
	const vizNodes: Array<{ dataset: Record<string, string> }> = [
		{ dataset: {} },
	]

	const fakeDocument = {
		readyState: "complete",
		getElementById: (_: string) => ({ textContent: "{}" }),
		querySelectorAll: (sel: string) =>
			sel === "[data-ir-id]"
				? irNodes
				: sel === "[data-viz]"
				? vizNodes
				: [],
		addEventListener: (_: string, __: unknown) => void 0,
	} as unknown as Document
	;(g as any).document = fakeDocument
	;(g as any).window = {}
	;(g as any).location = { hostname: "example.com" }

	// Import hydrate entry; it schedules a microtask to strip attributes
	const modUrl = new URL("../../../src/hydrate/engine.ts", import.meta.url)
	await import(modUrl.href)

	// Wait a microtask tick for the queued removal to run
	await Promise.resolve()

	for (const n of irNodes) {
		assertEquals(n.removed.includes("data-ir-id"), true)
	} // Restore globals

	;(g as any).document = prevDoc
	;(g as any).window = prevWin
	;(g as any).location = prevLoc
})
