import { assertEquals } from "@std/assert"

import isMetadataKey from "./index.ts"

//++ Tests for isMetadataKey
Deno.test("isMetadataKey", async (t) => {
	await t.step("returns true for version key", () => {
		assertEquals(isMetadataKey("version"), true)
	})

	await t.step("returns true for lastUpdated key", () => {
		assertEquals(isMetadataKey("lastUpdated"), true)
	})

	await t.step("returns true for author key", () => {
		assertEquals(isMetadataKey("author"), true)
	})

	await t.step("returns true for scope key", () => {
		assertEquals(isMetadataKey("scope"), true)
	})

	await t.step("returns true for description key", () => {
		assertEquals(isMetadataKey("description"), true)
	})

	await t.step("returns true for inherits key", () => {
		assertEquals(isMetadataKey("inherits"), true)
	})

	await t.step("returns false for non-metadata keys", () => {
		assertEquals(isMetadataKey("primeDirective"), false)
		assertEquals(isMetadataKey("commandments"), false)
		assertEquals(isMetadataKey("codeOrganization"), false)
		assertEquals(isMetadataKey("testing"), false)
		assertEquals(isMetadataKey("randomKey"), false)
	})

	await t.step("returns false for empty string", () => {
		assertEquals(isMetadataKey(""), false)
	})

	await t.step("is case-sensitive", () => {
		assertEquals(isMetadataKey("Version"), false)
		assertEquals(isMetadataKey("VERSION"), false)
		assertEquals(isMetadataKey("LastUpdated"), false)
	})
})
