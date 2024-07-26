import * as fc from "fast-check"
import { expect, test } from "vitest"

import sum from "."

test("[sum] (reduce/array) adds the numbers in the array together and returns the sum", () => {
	fc.assert(
		fc.property(fc.array(fc.integer()), numbers => {
			const total = sum(numbers)

			// We're just reproducing sum here, but how else?
			expect(total).toEqual(numbers.reduce((x, y) => x + y, 0))
		}),
	)
})
