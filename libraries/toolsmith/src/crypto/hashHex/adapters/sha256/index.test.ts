import { assertEquals } from "@std/assert"

import sha256Adapter from "./index.ts"

//++ Tests for sha256Adapter function

Deno.test("sha256Adapter", async (t) => {
	await t.step("hashes string correctly", async () => {
		const result = await sha256Adapter("hello world")

		assertEquals(
			result,
			"b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
		)
	})

	await t.step("hashes empty string", async () => {
		const result = await sha256Adapter("")

		assertEquals(
			result,
			"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
		)
	})

	await t.step("hashes Uint8Array", async () => {
		const input = new TextEncoder().encode("test")
		const result = await sha256Adapter(input)

		assertEquals(
			result,
			"9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
		)
	})

	await t.step("produces consistent hash for same input", async () => {
		const result1 = await sha256Adapter("consistency test")
		const result2 = await sha256Adapter("consistency test")

		assertEquals(result1, result2)
	})
})
