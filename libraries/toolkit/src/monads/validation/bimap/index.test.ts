import { expect } from "@std/expect"
import { describe, it } from "@std/testing/bdd"

import bimap from "./index.ts"
import valid from "../valid/index.ts"
import invalid from "../invalid/index.ts"
import isValid from "../isValid/index.ts"
import isInvalid from "../isInvalid/index.ts"

describe("bimap - transforms both Invalid and Valid values", () => {
	it("should transform valid values with the valid function", () => {
		const validation = valid<string, number>(21)
		const result = bimap<string, string, number, number>((e: string) => e.toUpperCase())((n: number) => n * 2)(validation)

		expect(isValid(result)).toBe(true)
	})

	it("should transform invalid single error with the invalid function", () => {
		const validation = invalid<string, number>(["error"])
		const result = bimap<string, string, number, number>((e: string) => e.toUpperCase())((n: number) => n * 2)(validation)

		expect(isInvalid(result)).toBe(true)
	})

	it("should transform invalid multiple errors with the invalid function", () => {
		const validation = invalid<string, number>(["first", "second", "third"])
		const result = bimap<string, string, number, number>((e: string) => e.toUpperCase())((n: number) => n * 2)(validation)

		expect(isInvalid(result)).toBe(true)
	})

	it("should transform complex types", () => {
		const validation = valid<string, number>(100)
		const result = bimap<string, { code: string }, number, string>((e: string) => ({ code: e }))((n: number) => n.toString())(validation)

		expect(isValid(result)).toBe(true)
	})

	it("should transform error objects", () => {
		type ValidationError = { field: string; message: string }
		const validation = invalid<ValidationError, number>([{ field: "age", message: "too young" }])
		const addTimestamp = (err: ValidationError) => ({ ...err, timestamp: 1234567890 })
		const doubled = (n: number) => n * 2

		const result = bimap<
			ValidationError,
			{ field: string; message: string; timestamp: number },
			number,
			number
		>(addTimestamp)(doubled)(validation)

		expect(isInvalid(result)).toBe(true)
	})

	it("should maintain validation structure", () => {
		const validation = valid<string, number>(255)
		const errorToString = (err: any) => JSON.stringify(err)
		const numberToHex = (n: number) => n.toString(16)

		const result = bimap<any, string, number, string>(errorToString)(numberToHex)(validation)

		expect(isValid(result)).toBe(true)
	})

	it("should handle identity transformations", () => {
		const identity = <T>(x: T) => x
		const validation = valid<unknown, string>("unchanged")
		const result = bimap<unknown, unknown, string, string>(identity)(identity)(validation)

		expect(isValid(result)).toBe(true)
	})
})
