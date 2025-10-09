// @sitebender/arborist/src/parseFile/_ensureSwcInitialized/index.test.ts
// Tests for SWC WASM initialization helper

import { assertEquals } from "jsr:@std/assert@1"
import _ensureSwcInitialized from "./index.ts"

Deno.test("_ensureSwcInitialized returns a Promise", () => {
	const result = _ensureSwcInitialized()
	assertEquals(typeof result.then, "function")
})

Deno.test("_ensureSwcInitialized resolves successfully", async () => {
	await _ensureSwcInitialized()
	// If we get here without throwing, the test passes
	assertEquals(true, true)
})

Deno.test("_ensureSwcInitialized is idempotent - multiple calls return same promise", () => {
	const first = _ensureSwcInitialized()
	const second = _ensureSwcInitialized()
	// Both calls should return the same promise instance
	assertEquals(first, second)
})

Deno.test("_ensureSwcInitialized can be called multiple times without error", async () => {
	await _ensureSwcInitialized()
	await _ensureSwcInitialized()
	await _ensureSwcInitialized()
	// If we get here without throwing, the test passes
	assertEquals(true, true)
})
