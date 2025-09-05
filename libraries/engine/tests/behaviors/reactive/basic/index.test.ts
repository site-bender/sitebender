import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import { computed, signal } from "../../../src/reactive/index.ts"

describe("reactive system - basic", () => {
	it("creates and updates signals", () => {
		const count = signal(0)
		assertEquals(count.value, 0)

		count.set(5)
		assertEquals(count.value, 5)
	})

	it("updates computed when signal changes", () => {
		const count = signal(0)
		const doubled = computed(() => count.value * 2)

		assertEquals(doubled.value, 0)
		count.set(5)
		assertEquals(doubled.value, 10)
	})
})
