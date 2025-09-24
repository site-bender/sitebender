import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"

import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/ValidationError/index.ts"

import invalid from "../invalid/index.ts"
import valid from "../valid/index.ts"
import isInvalid from "./index.ts"

Deno.test("isInvalid - type guard narrows to Invalid", () => {
	const errs: NonEmptyArray<ValidationError> = [{ field: "x", messages: ["e"] }]
	const v = invalid<ValidationError, number>(errs)

	assert(isInvalid(v))

	if (isInvalid(v)) {
		assertEquals(v.errors, errs)
	}
})

Deno.test("isInvalid - false for Valid and narrows to Valid branch", () => {
	const v = valid(123)

	assert(!isInvalid(v))

	if (!isInvalid(v)) {
		assertEquals(v.value, 123)
	}
})
