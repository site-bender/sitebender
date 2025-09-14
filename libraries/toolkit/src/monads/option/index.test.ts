import { expect } from "@std/expect"

import just from "./just/index.ts"
import nothing from "./nothing/index.ts"
import map from "./map/index.ts"
import chain from "./chain/index.ts"
import getOrElse from "./getOrElse/index.ts"
import of_ from "./of/index.ts"

Deno.test("Option - just and nothing", async (t) => {
  await t.step("creates a Just", () => {
    const j = just(42)
    expect(j._tag).toBe("Just")
    if (j._tag === "Just") expect(j.value).toBe(42)
  })

  await t.step("creates a Nothing", () => {
    const n = nothing<number>()
    expect(n._tag).toBe("Nothing")
  })
})

Deno.test("Option - of alias", async (t) => {
  await t.step("of creates Just", () => {
    const j = of_<number>(5)
    expect(j._tag).toBe("Just")
  })
})

Deno.test("Option - map", async (t) => {
  await t.step("maps Just", () => {
    const r = map((x: number) => x * 2)(just(21))
    if (r._tag === "Just") expect(r.value).toBe(42)
  })

  await t.step("ignores Nothing", () => {
    const r = map((x: number) => x * 2)(nothing<number>())
    expect(r._tag).toBe("Nothing")
  })
})

Deno.test("Option - chain", async (t) => {
  const safeInv = (n: number) => (n === 0 ? nothing<number>() : just(1 / n))

  await t.step("chains Just", () => {
    const r = chain(safeInv)(just(2))
    if (r._tag === "Just") expect(r.value).toBe(0.5)
  })

  await t.step("short-circuits Nothing", () => {
    const r = chain(safeInv)(just(0))
    expect(r._tag).toBe("Nothing")
  })
})

Deno.test("Option - getOrElse", async (t) => {
  await t.step("returns inner for Just", () => {
    const r = getOrElse(() => 0)(just(7))
    expect(r).toBe(7)
  })

  await t.step("returns default for Nothing", () => {
    const r = getOrElse(() => 0)(nothing<number>())
    expect(r).toBe(0)
  })
})
