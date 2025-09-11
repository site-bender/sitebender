import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"

import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/ValidationError/index.ts"

import invalid from "../invalid/index.ts"
import valid from "../valid/index.ts"
import isValid from "./index.ts"

Deno.test("isValid - type guard narrows to Valid", () => {
	const v = valid(123)

	assert(isValid(v))

	if (isValid(v)) {
		assertEquals(v.value, 123)
	}
})

Deno.test("isValid - false for Invalid and narrows to Invalid branch", () => {
	const errs: NonEmptyArray<ValidationError> = [{ field: "x", messages: ["e"] }]
	const v = invalid<ValidationError, number>(errs)

	assert(!isValid(v))

	if (!isValid(v)) {
		assertEquals(v.errors, errs)
	}
})
