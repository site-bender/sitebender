import { expect } from "@std/expect"

import doState, { get, modify, put } from "./index.ts"

Deno.test("doState - sequences state operations", () => {
	type S = { n: number }
	const prog = doState<S, number>(function* () {
		const s1 = (yield get<S>()) as S
		yield put<S>({ n: s1.n + 1 })
		const s2 = (yield get<S>()) as S
		yield modify<S>((s) => ({ n: s.n * 2 }))
		const s3 = (yield get<S>()) as S
		return s1.n + s2.n + s3.n
	})

	const [value, state] = prog({ n: 2 })
	expect(value).toBe(2 + 3 + 6)
	expect(state).toEqual({ n: 6 })
})
