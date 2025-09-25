import { expect } from "@std/expect"

import chain from "./chain/index.ts"
import delay from "./delay/index.ts"
import map from "./map/index.ts"
import of_ from "./of/index.ts"
import run from "./run/index.ts"

Deno.test("Future - of, map, chain, delay, run", async (t) => {
	await t.step("of produces a resolved future", async () => {
		const f = of_(42)
		expect(await run(f)).toBe(42)
	})

	await t.step("map transforms future value", async () => {
		const f = map((x: number) => x * 2)(of_(21))
		expect(await run(f)).toBe(42)
	})

	await t.step("chain sequences futures", async () => {
		const f = chain((n: number) => of_(n + 2))(of_(40))
		expect(await run(f)).toBe(42)
	})

	await t.step("delay shifts resolution in time", async () => {
		const start = Date.now()
		const f = delay(15)(of_("x"))
		const v = await run(f)
		const elapsed = Date.now() - start
		expect(v).toBe("x")
		expect(elapsed >= 10).toBe(true)
	})
})
