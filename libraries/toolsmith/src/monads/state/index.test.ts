import { expect } from "@std/expect"

import chain from "./chain/index.ts"
import evalState from "./evalState/index.ts"
import execState from "./execState/index.ts"
import get from "./get/index.ts"
import map from "./map/index.ts"
import modify from "./modify/index.ts"
import of_ from "./of/index.ts"
import put from "./put/index.ts"

type S = { n: number }

Deno.test("State - of, map, chain, get/put/modify, eval/exec", async (t) => {
	await t.step("of yields value and preserves state", () => {
		const sa = of_<number, S>(42)
		expect(sa({ n: 1 })).toEqual([42, { n: 1 }])
	})

	await t.step("map transforms value only", () => {
		const sa = map((x: number) => x * 2)(of_<number, S>(21))
		expect(sa({ n: 0 })).toEqual([42, { n: 0 }])
	})

	await t.step("chain sequences stateful computations", () => {
		const inc = (x: number) => modify<S>((s) => ({ n: s.n + x }))
		const prog = chain(() => chain(() => get<S>())(inc(1)))(of_<number, S>(0))
		expect(prog({ n: 41 })).toEqual([{ n: 42 }, { n: 42 }])
	})

	await t.step("get reads state; put replaces it", () => {
		const read = get<S>()
		const set = put<S>({ n: 5 })
		expect(read({ n: 1 })).toEqual([{ n: 1 }, { n: 1 }])
		expect(set({ n: 1 })).toEqual([undefined, { n: 5 }])
	})

	await t.step("evalState and execState project output and state", () => {
		const sa = of_<number, S>(7)
		expect(evalState(sa)({ n: 9 })).toBe(7)
		expect(execState(sa)({ n: 9 })).toEqual({ n: 9 })
	})
})
