import isNullish from "."
import { expect, test } from "vitest"

test("[isNullish] (predicates) returns true if the argument is null or undefined", () => {
	const isNull = null
	const isUndefined = undefined

	expect(isNullish(isNull)).toBeTruthy()
	expect(isNullish(isUndefined)).toBeTruthy()
})

test("[isNullish] (predicates) returns false if the argument is neither null nor undefined", () => {
	const isBoolean = false
	const isNumber = 0
	const isString = ""
	const isArray = []
	const isObject = {}
	const isFunction = () => null

	expect(isNullish(isBoolean)).toBeFalsy()
	expect(isNullish(isNumber)).toBeFalsy()
	expect(isNullish(isString)).toBeFalsy()
	expect(isNullish(isArray)).toBeFalsy()
	expect(isNullish(isObject)).toBeFalsy()
	expect(isNullish(isFunction)).toBeFalsy()
})
