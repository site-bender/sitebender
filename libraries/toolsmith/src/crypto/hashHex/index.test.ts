import {
	assertEquals,
	assertRejects,
} from "https://deno.land/std@0.208.0/assert/mod.ts"

import hashHex from "./index.ts"

//++ Tests for the generic hashHex function

Deno.test("hashHex", async (t) => {
	await t.step("hashes string input with SHA-256 by default", async () => {
		const result = await hashHex("hello world")

		assertEquals(
			result,
			"b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
		)
	})

	await t.step("uses custom adapter when provided", async () => {
		const customAdapter = () => Promise.resolve("custom-hash-output")
		const result = await hashHex("test", { adapter: customAdapter })

		assertEquals(result, "custom-hash-output")
	})

	await t.step("throws for unimplemented algorithms", async () => {
		await assertRejects(
			() => hashHex("test", { algorithm: "blake3" }),
			Error,
			"BLAKE3 adapter not yet implemented",
		)
	})

	await t.step("throws for unknown algorithm without adapter", async () => {
		const unknownAlgorithm = "unknown" as unknown as "sha256"

		await assertRejects(
			() => hashHex("test", { algorithm: unknownAlgorithm }),
			Error,
			"No adapter available for algorithm",
		)
	})
})
