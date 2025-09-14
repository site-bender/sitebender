import { expect } from "@std/expect"

import of_ from "./of/index.ts"
import map from "./map/index.ts"
import chain from "./chain/index.ts"
import ask from "./ask/index.ts"
import asks from "./asks/index.ts"
import local from "./local/index.ts"

type Env = { base: number; factor: number }

Deno.test("Reader - of, map, chain, ask/asks, local", async (t) => {
  await t.step("of returns constant regardless of env", () => {
    const r = of_<number, Env>(42)
    expect(r({ base: 1, factor: 2 })).toBe(42)
  })

  await t.step("map transforms computed value", () => {
    const r1 = of_<number, Env>(21)
    const r2 = map((x: number) => x * 2)(r1)
    expect(r2({ base: 0, factor: 0 })).toBe(42)
  })

  await t.step("chain sequences dependent readers", () => {
    const baseR = asks<Env, number>((e) => e.base)
    const addFactor = (n: number) => asks<Env, number>((e) => n + e.factor)
    const r = chain(addFactor)(baseR)
    expect(r({ base: 40, factor: 2 })).toBe(42)
  })

  await t.step("ask retrieves full environment", () => {
    const r = ask<Env>()
    expect(r({ base: 1, factor: 2 })).toEqual({ base: 1, factor: 2 })
  })

  await t.step("local modifies environment for a computation", () => {
    const getBase = asks<Env, number>((e) => e.base)
    const doubleBase = local<Env, Env>(({ base, factor }) => ({ base: base * 2, factor }))
    const r = doubleBase(getBase)
    expect(r({ base: 21, factor: 0 })).toBe(42)
  })
})
