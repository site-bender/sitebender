import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"

import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/fp/validation/index.ts"

import failure from "../failure/index.ts"
import success from "../success/index.ts"
import isInvalid from "./index.ts"

Deno.test("isInvalid - type guard narrows to Invalid", () => {
	const errs: NonEmptyArray<ValidationError> = [{ field: "x", messages: ["e"] }]
	const v = failure<ValidationError, number>(errs)

	assert(isInvalid(v))

	if (isInvalid(v)) {
		assertEquals(v.errors, errs)
	}
})

Deno.test("isInvalid - false for Valid and narrows to Valid branch", () => {
	const v = success(123)

	assert(!isInvalid(v))

	if (!isInvalid(v)) {
		assertEquals(v.value, 123)
	}
})
