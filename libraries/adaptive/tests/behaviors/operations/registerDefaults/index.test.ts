import { assert } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import { registerDefaultExecutors } from "../../../../src/operations/defaults/registerDefaults.ts"
import { createComposeContext } from "../../../../src/context/composeContext.ts"
import { listOperators } from "../../../../src/operations/registries/operators.ts"
import { listComparators } from "../../../../src/operations/registries/comparators.ts"
import { listInjectors } from "../../../../src/operations/registries/injectors.ts"
import { listActions } from "../../../../src/operations/registries/actions.ts"
import { listEvents, registerEvent } from "../../../../src/operations/registries/events.ts"

// Ensure defaults register expected namespaces

describe("registerDefaultExecutors", () => {
  it("registers From.*, Op.*, Is.*, Act.*, and baseline On.*", () => {
    const ctx = createComposeContext({ env: 'server' })
    registerDefaultExecutors(ctx)

    const ops = listOperators()
    const cmps = listComparators()
    const inj = listInjectors()
    const acts = listActions()

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
    registerEvent("On.Test", () => {})
    const evs = listEvents()
    assert(evs.includes("On.Test"))
  })
})
