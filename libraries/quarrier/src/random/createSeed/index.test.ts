import { assertEquals } from "https://deno.land/std@0.213.0/assert/mod.ts"
import * as fc from "https://esm.sh/fast-check@3.15.0"

import createSeed from "./index.ts"

Deno.test("createSeed", async (t) => {
	await t.step("creates valid seed from positive integer", () => {
		const result = createSeed(42)
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value.state, 42)
			assertEquals(typeof result.value.stream, "number")
			assertEquals(result.value.stream % 2, 1) // Stream must be odd
		}
	})

	await t.step("creates valid seed from zero", () => {
		const result = createSeed(0)
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value.state, 1) // Zero coerced to 1
			assertEquals(typeof result.value.stream, "number")
		}
	})

	await t.step("creates valid seed with custom stream", () => {
		const result = createSeed(42, 8)
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value.state, 42)
			assertEquals(result.value.stream, 9) // 8 forced to odd (9)
		}
	})

	await t.step("forces even stream to odd", () => {
		const result = createSeed(100, 1000)
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value.stream, 1001) // 1000 forced to 1001
		}
	})

	await t.step("handles negative numbers by converting to unsigned", () => {
		const result = createSeed(-42)
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(typeof result.value.state, "number")
			assertEquals(result.value.state > 0, true)
		}
	})

	await t.step("rejects non-integer state", () => {
		const result = createSeed(3.14)
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.type, "InvalidSeed")
			if (result.error.type === "InvalidSeed") {
				assertEquals(result.error.seed, 3.14)
			}
		}
	})

	await t.step("rejects NaN", () => {
		const result = createSeed(NaN)
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.type, "InvalidSeed")
		}
	})

	await t.step("rejects Infinity", () => {
		const result = createSeed(Infinity)
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.type, "InvalidSeed")
		}
	})

	await t.step("property: always produces valid seeds for integers", () => {
		fc.assert(
			fc.property(fc.integer(), fc.option(fc.integer()), (state, stream) => {
				const result = stream !== null
					? createSeed(state, stream)
					: createSeed(state)

				if (result._tag === "Ok") {
					// State is always a non-zero 32-bit unsigned integer
					// (JavaScript bitwise operations work on 32-bit values)
					return result.value.state > 0 &&
						Number.isInteger(result.value.state) &&
						// Stream is always odd
						result.value.stream % 2 === 1
				}
				return false
			}),
		)
	})

	await t.step(
		"property: deterministic - same input produces same output",
		() => {
			fc.assert(
				fc.property(fc.integer(), fc.option(fc.integer()), (state, stream) => {
					const result1 = stream !== null
						? createSeed(state, stream)
						: createSeed(state)
					const result2 = stream !== null
						? createSeed(state, stream)
						: createSeed(state)

					if (result1._tag === "Ok" && result2._tag === "Ok") {
						return result1.value.state === result2.value.state &&
							result1.value.stream === result2.value.stream
					}
					return result1._tag === result2._tag
				}),
			)
		},
	)
})
