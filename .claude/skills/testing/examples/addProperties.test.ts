//++ Example: Property-based testing for mathematical properties
//++ Demonstrates testing algebraic properties with fast-check

import { assertEquals } from "@std/assert"
import * as fc from "npm:fast-check"

//++ Function under test: curried addition
function add(augend: number) {
	return function addToAugend(addend: number): number {
		return augend + addend
	}
}

//++ Property-based tests for add
Deno.test("add properties", async (t) => {
	await t.step("property: commutative", () => {
		fc.assert(
			fc.property(fc.integer(), fc.integer(), (a, b) => {
				return add(a)(b) === add(b)(a)
			}),
		)
	})

	await t.step("property: associative", () => {
		fc.assert(
			fc.property(fc.integer(), fc.integer(), fc.integer(), (a, b, c) => {
				return add(add(a)(b))(c) === add(a)(add(b)(c))
			}),
		)
	})

	await t.step("property: identity element is zero", () => {
		fc.assert(
			fc.property(fc.integer(), (a) => {
				return add(a)(0) === a && add(0)(a) === a
			}),
		)
	})

	await t.step("property: inverse operation with subtract", () => {
		fc.assert(
			fc.property(fc.integer(), fc.integer(), (a, b) => {
				const sum = add(a)(b)
				const difference = sum - b
				return difference === a
			}),
		)
	})

	await t.step("property: adding positive increases value", () => {
		fc.assert(
			fc.property(fc.integer(), fc.nat(), (a, positive) => {
				if (positive === 0) return true // Skip zero
				return add(a)(positive) > a
			}),
		)
	})

	await t.step("property: adding negative decreases value", () => {
		fc.assert(
			fc.property(fc.integer(), fc.nat(), (a, positive) => {
				if (positive === 0) return true // Skip zero
				const negative = -positive
				return add(a)(negative) < a
			}),
		)
	})

	await t.step("property: doubles when added to itself", () => {
		fc.assert(
			fc.property(fc.integer(), (a) => {
				return add(a)(a) === a * 2
			}),
		)
	})

	await t.step("property: order matters for chaining", () => {
		fc.assert(
			fc.property(fc.integer(), fc.integer(), fc.integer(), (a, b, c) => {
				const left = add(add(a)(b))(c)
				const right = add(a)(add(b)(c))
				return left === right // Associative property holds
			}),
		)
	})
})
