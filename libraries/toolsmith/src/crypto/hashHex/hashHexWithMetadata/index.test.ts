import { assertEquals } from "@std/assert"
import hashHexWithMetadata from "./index.ts"

//++ Tests for hashHexWithMetadata function

Deno.test("hashHexWithMetadata", async (t) => {
	await t.step("returns hash with metadata", async () => {
		const result = await hashHexWithMetadata("test data")

		assertEquals(typeof result.hex, "string")
		assertEquals(result.hex.length, 64)
		assertEquals(result.metadata.algorithm, "sha256")
		assertEquals(result.metadata.version, 1)
		assertEquals(typeof result.metadata.timestamp, "string")
	})

	await t.step("respects algorithm option", async () => {
		const customAdapter = () => Promise.resolve("custom-hash")
		const result = await hashHexWithMetadata("test", {
			algorithm: "blake3",
			adapter: customAdapter,
		})

		assertEquals(result.hex, "custom-hash")
		assertEquals(result.metadata.algorithm, "blake3")
	})

	await t.step("includes ISO timestamp", async () => {
		const result = await hashHexWithMetadata("test")
		const timestamp = new Date(result.metadata.timestamp)

		assertEquals(isNaN(timestamp.getTime()), false)
	})
})
