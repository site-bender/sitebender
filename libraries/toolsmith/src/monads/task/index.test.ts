import { expect } from "@std/expect"

import chain from "./chain/index.ts"
import delay from "./delay/index.ts"
import fromPromise from "./fromPromise/index.ts"
import map from "./map/index.ts"
import of_ from "./of/index.ts"
import parallel from "./parallel/index.ts"
import race from "./race/index.ts"
import run from "./run/index.ts"

Deno.test("Task - of, map, chain, run", async (t) => {
	await t.step("of creates resolved task", async () => {
		const t1 = of_(42)
		expect(await run(t1)).toBe(42)
	})

	await t.step("map transforms task value", async () => {
		const t1 = of_(21)
		const t2 = map((x: number) => x * 2)(t1)
		expect(await run(t2)).toBe(42)
	})

	await t.step("chain sequences tasks", async () => {
		const t = chain((n: number) => of_(n + 2))(of_(40))
		expect(await run(t)).toBe(42)
	})
})

Deno.test("Task - delay", async (t) => {
	await t.step("delays execution roughly by ms", async () => {
		const start = Date.now()
		const t = delay(20)(of_("x"))
		const v = await run(t)
		const elapsed = Date.now() - start
		expect(v).toBe("x")
		expect(elapsed >= 15).toBe(true)
	})
})

Deno.test({
	name: "Task - fromPromise, parallel, race",
	sanitizeOps: false,
	sanitizeResources: false,
}, async (t) => {
	await t.step("fromPromise lifts a Promise", async () => {
		const p = Promise.resolve(42)
		const t = fromPromise(p)
		expect(await run(t)).toBe(42)
	})

	await t.step("parallel runs tasks concurrently", async () => {
		const mk = (n: number, ms: number) => delay(ms)(of_(n))
		const t = parallel([mk(1, 5), mk(2, 10), mk(3, 1)])
		expect(await run(t)).toEqual([1, 2, 3])
	})

	await t.step("race returns the first to settle", async () => {
		const a = delay(15)(of_("a"))
		const b = delay(5)(of_("b"))
		const r = await run(race([a, b]))
		expect(r).toBe("b")
	})
})
