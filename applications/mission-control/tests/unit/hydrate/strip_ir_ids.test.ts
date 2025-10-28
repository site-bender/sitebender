import { assertEquals } from "@std/assert"

type GlobalShims = {
	document?: Document
	window?: unknown
	location?: Location | { hostname: string }
}

Deno.test("docs hydrate strips data-ir-id in non-local environments", async () => {
	const g = globalThis as unknown as GlobalShims
	const prevDoc = g.document
	const prevWin = g.window
	const prevLoc = g.location

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
			sel === "[data-ir-id]" ? irNodes : sel === "[data-viz]" ? vizNodes : [],
		addEventListener: (_: string, __: unknown) => void 0,
	} as unknown as Document
	g.document = fakeDocument
	g.window = {}
	g.location = { hostname: "example.com" }

	// Import hydrate entry; it schedules a microtask to strip attributes
	const modUrl = new URL("../../../src/hydrate/artificer.ts", import.meta.url)
	await import(modUrl.href)

	// Wait a microtask tick for the queued removal to run
	await Promise.resolve()

	for (const n of irNodes) {
		assertEquals(n.removed.includes("data-ir-id"), true)
	} // Restore globals

	g.document = prevDoc
	g.window = prevWin
	g.location = prevLoc
})
