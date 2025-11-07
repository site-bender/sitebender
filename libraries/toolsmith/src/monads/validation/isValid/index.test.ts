import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"

import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/fp/validation/index.ts"

import failure from "../failure/index.ts"
import success from "../success/index.ts"
import isValid from "./index.ts"

Deno.test("isValid - type guard narrows to Valid", () => {
	const v = success(123)

	assert(isValid(v))

	if (isValid(v)) {
		assertEquals(v.value, 123)
	}
})

Deno.test("isValid - false for Invalid and narrows to Invalid branch", () => {
	const errs: NonEmptyArray<ValidationError> = [{ field: "x", messages: ["e"] }]
	const v = failure<ValidationError, number>(errs)

	assert(!isValid(v))

	if (!isValid(v)) {
		assertEquals(v.errors, errs)
	}
})
