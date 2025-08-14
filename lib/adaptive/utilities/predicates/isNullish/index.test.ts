import { assertEquals } from "jsr:@std/assert"

import isNullish from "./index.ts"

Deno.test("[isNullish] (predicates) returns true if the argument is null or undefined", () => {
	const isNull = null
	const isUndefined = undefined

	assertEquals(isNullish(isNull), true)
	assertEquals(isNullish(isUndefined), true)
})

Deno.test("[isNullish] (predicates) returns false if the argument is neither null nor undefined", () => {
	const isBoolean = false
	const isNumber = 0
	const isString = ""
	const isArray = []
	const isObject = {}
	const isFunction = () => null

	assertEquals(isNullish(isBoolean), false)
	assertEquals(isNullish(isNumber), false)
	assertEquals(isNullish(isString), false)
	assertEquals(isNullish(isArray), false)
	assertEquals(isNullish(isObject), false)
	assertEquals(isNullish(isFunction), false)
})
