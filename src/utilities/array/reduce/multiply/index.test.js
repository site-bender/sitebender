import * as fc from "fast-check"
import { expect, test } from "vitest"

import multiply from "."

test("[multiply] (reduce/array) multiplies the numbers in the array together and returns the product", () => {
	fc.assert(
		fc.property(fc.array(fc.integer()), numbers => {
			const product = multiply(numbers)

			// We're just reproducing multiply here, but how else?
			expect(product).toEqual(numbers.reduce((x, y) => x * y, 1))
		}),
	)
})
