import { assert } from "https://deno.land/std@0.218.0/assert/mod.ts"

import isLeft from "../isLeft/index.ts"
import isRight from "../isRight/index.ts"
import left from "../left/index.ts"
import right from "../right/index.ts"
import bimap from "./index.ts"

Deno.test("bimap - transforms both Left and Right values", async (t) => {
	await t.step("should transform right values with the right function", () => {
		const either = right<number, string>(21)
		const result = bimap((e: string) => e.toUpperCase())((n: number) => n * 2)(
			either,
		)

		assert(isRight(result))
	})

	await t.step(
		"should transform left simple value with the left function",
		() => {
			const either = left<string, number>("error")
			const result = bimap((e: string) => e.toUpperCase())((n: number) =>
				n * 2
			)(either)

			assert(isLeft(result))
		},
	)

	await t.step("should transform multiple left error values (array)", () => {
		const either = left<string[], number>(["first", "second", "third"])
		const result = bimap((errors: string[]) =>
			errors.map((e) => e.toUpperCase())
		)((n: number) => n * 2)(either)

		assert(isLeft(result))
	})

	await t.step("should transform complex right types", () => {
		const either = right<number, string>(100)
		const result = bimap((e: string) => ({ code: e }))((n: number) =>
			n.toString()
		)(either)

		assert(isRight(result))
	})

	await t.step("should transform object left values", () => {
		type Problem = { field: string; message: string }
		const either = left<Problem, number>({ field: "age", message: "too young" })
		const addTimestamp = (err: Problem) => ({
			...err,
			timestamp: 1234567890,
		})
		const doubled = (n: number) => n * 2
		const result = bimap<
			Problem,
			{ field: string; message: string; timestamp: number }
		>(addTimestamp)(doubled)(either)

		assert(isLeft(result))
	})

	await t.step("should maintain either structure", () => {
		const either = right<number, unknown>(255)
		const errorToString = (err: unknown) => JSON.stringify(err)
		const numberToHex = (n: number) => n.toString(16)
		const result = bimap<unknown, string>(errorToString)(numberToHex)(either)

		assert(isRight(result))
	})

	await t.step("should handle identity transformations", () => {
		const identity = <T>(x: T) => x
		const either = right("unchanged")
		const result = bimap(identity)(identity)(either)
		assert(isRight(result))
	})
})
