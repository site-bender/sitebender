import { assertEquals } from "@std/assert"
import bytesToHex from "./index.ts"

//++ Tests for bytesToHex function

Deno.test("bytesToHex", async (t) => {
	await t.step("converts single byte to hex", () => {
		const result = bytesToHex(new Uint8Array([255]))

		assertEquals(result, "ff")
	})

	await t.step("pads single digit hex values with zero", () => {
		const result = bytesToHex(new Uint8Array([0, 1, 15]))

		assertEquals(result, "00010f")
	})

	await t.step("converts multiple bytes correctly", () => {
		const result = bytesToHex(new Uint8Array([255, 128, 0, 64]))

		assertEquals(result, "ff800040")
	})

	await t.step("handles empty array", () => {
		const result = bytesToHex(new Uint8Array([]))

		assertEquals(result, "")
	})
})
