import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import { computed, effect, signal } from "../../../src/reactive/index.ts"

describe("reactive system", () => {
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

	it("handles multiple computed dependencies", () => {
		const a = signal(2)
		const b = signal(3)
		const sum = computed(() => a.value + b.value)
		const product = computed(() => sum.value * 2)

		assertEquals(sum.value, 5)
		assertEquals(product.value, 10)

		a.set(5)
		assertEquals(sum.value, 8)
		assertEquals(product.value, 16)

		b.set(2)
		assertEquals(sum.value, 7)
		assertEquals(product.value, 14)
	})

	it("runs effects when dependencies change", () => {
		const count = signal(0)
		let effectRuns = 0
		let lastValue = 0

		effect(() => {
			effectRuns++
			lastValue = count.value
		})

		// Effect should run immediately
		assertEquals(effectRuns, 1)
		assertEquals(lastValue, 0)

		count.set(5)
		assertEquals(effectRuns, 2)
		assertEquals(lastValue, 5)

		count.set(10)
		assertEquals(effectRuns, 3)
		assertEquals(lastValue, 10)
	})

	it("handles computed values in effects", () => {
		const count = signal(1)
		const doubled = computed(() => count.value * 2)
		let effectRuns = 0
		let lastDoubledValue = 0

		effect(() => {
			effectRuns++
			lastDoubledValue = doubled.value
		})

		assertEquals(effectRuns, 1)
		assertEquals(lastDoubledValue, 2)

		count.set(3)
		assertEquals(effectRuns, 2)
		assertEquals(lastDoubledValue, 6)
	})

	it("doesn't trigger updates for same values", () => {
		const count = signal(5)
		let effectRuns = 0

		effect(() => {
			effectRuns++
			count.value // Access to create dependency
		})

		assertEquals(effectRuns, 1)

		// Setting the same value shouldn't trigger effects
		count.set(5)
		assertEquals(effectRuns, 1)

		// Setting a different value should trigger
		count.set(6)
		assertEquals(effectRuns, 2)
	})
})
