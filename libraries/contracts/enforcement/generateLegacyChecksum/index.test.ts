import { assertEquals, assertMatch } from "https://deno.land/std/assert/mod.ts"
import generateLegacyChecksum from "./index.ts"

Deno.test("generateLegacyChecksum", async (t) => {
	await t.step("generates hex string checksum", () => {
		const checksum = generateLegacyChecksum("hello")
		assertMatch(checksum, /^[a-f0-9]+$/)
	})

	await t.step("generates same checksum for same input", () => {
		const input = "test data"
		const checksum1 = generateLegacyChecksum(input)
		const checksum2 = generateLegacyChecksum(input)

		assertEquals(checksum1, checksum2)
	})

	await t.step("generates different checksums for different inputs", () => {
		const checksum1 = generateLegacyChecksum("input1")
		const checksum2 = generateLegacyChecksum("input2")

		assertEquals(checksum1 === checksum2, false)
	})

	await t.step("handles empty string", () => {
		const checksum = generateLegacyChecksum("")
		assertMatch(checksum, /^[a-f0-9]+$/)
		assertEquals(checksum, "0")
	})

	await t.step("handles special characters", () => {
		const checksum = generateLegacyChecksum("!@#$%^&*()")
		assertMatch(checksum, /^[a-f0-9]+$/)
	})

	await t.step("handles unicode characters", () => {
		const checksum = generateLegacyChecksum("Hello 世界 🌍")
		assertMatch(checksum, /^-?[a-f0-9]+$/)
	})

	await t.step("handles long strings", () => {
		const longString = "a".repeat(10000)
		const checksum = generateLegacyChecksum(longString)
		assertMatch(checksum, /^-?[a-f0-9]+$/)
	})
})