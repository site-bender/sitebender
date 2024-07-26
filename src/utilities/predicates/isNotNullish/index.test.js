import { expect, test } from "vitest"

import isNotNullish from "."

test("[isNotNullish] (predicates) returns true if the argument is neither null nor undefined", () => {
	const isBoolean = false
	const isNumber = 0
	const isString = ""
	const isArray = []
	const isObject = {}
	const isFunction = () => null

	expect(isNotNullish(isBoolean)).toBeTruthy()
	expect(isNotNullish(isNumber)).toBeTruthy()
	expect(isNotNullish(isString)).toBeTruthy()
	expect(isNotNullish(isArray)).toBeTruthy()
	expect(isNotNullish(isObject)).toBeTruthy()
	expect(isNotNullish(isFunction)).toBeTruthy()
})

test("[isNotNullish] (predicates) returns false if the argument is null or undefined", () => {
	const isNull = null
	const isUndefined = undefined

	expect(isNotNullish(isNull)).toBeFalsy()
	expect(isNotNullish(isUndefined)).toBeFalsy()
})
