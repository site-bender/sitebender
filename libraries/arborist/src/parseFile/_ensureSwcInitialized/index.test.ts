// @sitebender/arborist/src/parseFile/_ensureSwcInitialized/index.test.ts
// Tests for SWC WASM initialization helper

import { assertEquals } from "jsr:@std/assert@1"
import _ensureSwcInitialized from "./index.ts"

Deno.test({
	name: "_ensureSwcInitialized returns a Promise",
	sanitizeResources: false, // SWC WASM initialization creates global resources
	fn() {
		const result = _ensureSwcInitialized()
		assertEquals(typeof result.then, "function")
	},
})

Deno.test({
	name: "_ensureSwcInitialized resolves successfully",
	sanitizeResources: false, // SWC WASM initialization creates global resources
	sanitizeOps: false, // SWC WASM async ops may span tests
	async fn() {
		await _ensureSwcInitialized()
		// If we get here without throwing, the test passes
		assertEquals(true, true)
	},
})

Deno.test({
	name:
		"_ensureSwcInitialized is idempotent - multiple calls return same promise",
	sanitizeResources: false, // SWC WASM initialization creates global resources
	fn() {
		const first = _ensureSwcInitialized()
		const second = _ensureSwcInitialized()
		// Both calls should return the same promise instance
		assertEquals(first, second)
	},
})

Deno.test({
	name: "_ensureSwcInitialized can be called multiple times without error",
	sanitizeResources: false, // SWC WASM initialization creates global resources
	async fn() {
		await _ensureSwcInitialized()
		await _ensureSwcInitialized()
		await _ensureSwcInitialized()
		// If we get here without throwing, the test passes
		assertEquals(true, true)
	},
})
