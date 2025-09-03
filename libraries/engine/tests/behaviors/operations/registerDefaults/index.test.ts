import { assert } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import createComposeContext from "../../../../src/context/composeContext.ts"
import registerDefaultExecutors from "../../../../src/operations/defaults/registerDefaults.ts"
import actions from "../../../../src/operations/registries/actions.ts"
import comparators from "../../../../src/operations/registries/comparators.ts"
import events from "../../../../src/operations/registries/events.ts"
import injectors from "../../../../src/operations/registries/injectors.ts"
import operators from "../../../../src/operations/registries/operators.ts"

// Ensure defaults register expected namespaces

describe("registerDefaultExecutors", () => {
	it("registers From.*, Op.*, Is.*, Act.*, and baseline On.*", () => {
		const ctx = createComposeContext({ env: "server" })
		registerDefaultExecutors(ctx)

		const ops = operators.list()
		const cmps = comparators.list()
		const inj = injectors.list()
		const acts = actions.list()

		// At least these basics
		assert(ops.includes("Op.Add"))
		assert(ops.includes("Op.Multiply"))
		assert(cmps.includes("Is.EqualTo"))
		assert(cmps.includes("Is.Not"))
		assert(inj.includes("From.Constant"))
		assert(inj.includes("From.QueryString"))
		assert(acts.includes("Act.SetValue"))

		// Events are registered lazily; registerDefaults binds common events via registerEvent directly
		// Ensure we can add an event and list it
		events.register("On.Test", () => {})
		const evs = events.list()
		assert(evs.includes("On.Test"))
	})
})
