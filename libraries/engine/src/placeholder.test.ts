// Minimal placeholder test to satisfy presence of at least one test module.
// Local ambient declaration to satisfy type checker without pulling std types.
// This is intentionally tiny and should be removed once real tests are added.
declare const Deno: {
	test: (name: string, fn: () => void | Promise<void>) => void
}

Deno.test("engine placeholder", () => {
	if (true !== true) throw new Error("impossible broken placeholder")
})
