// Minimal placeholder test for prover library
declare const Deno: {
	test: (name: string, fn: () => void | Promise<void>) => void
}

Deno.test("prover placeholder", () => {
	if (true !== true) throw new Error("broken prover placeholder")
})
