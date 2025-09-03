import { assert } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import createComposeContext from "../../../../../src/context/composeContext/index.ts"
import registerDefaultExecutors from "../../../../../src/operations/defaults/registerDefaults/index.ts"
import comparators from "../../../../../src/operations/registries/comparators.ts"

describe("registerDefaultExecutors - MVP comparator tags", () => {
	it("includes NotEmpty and NoLongerThan", () => {
		const ctx = createComposeContext({ env: "server" })
		registerDefaultExecutors(ctx)

		const cmps = comparators.list()
		assert(cmps.includes("Is.NotEmpty"))
		assert(cmps.includes("Is.NoLongerThan"))
	})
})
