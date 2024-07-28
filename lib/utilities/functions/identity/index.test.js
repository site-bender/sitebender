import * as fc from "fast-check"
import { expect, test } from "vitest"

import identity from "."

test("[identity] (functions) returns the identical item passed", () => {
	fc.assert(
		fc.property(fc.anything(), x => {
			const result = identity(x)

			if (x == null || x == undefined) expect(result).toEqual(x)

			expect(result).toBe(x)
		}),
	)
})
