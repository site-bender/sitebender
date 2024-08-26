import { expect, test } from "vitest"

import getErrorMessage from "./"

test("[getErrorMessage] (operations::comparators::compare) returns error message part", () => {
	expect(getErrorMessage({ tag: "IsAfterDate" })).toEqual("is not after")
	expect(getErrorMessage({ tag: "IsBeforeDate" })).toEqual("is not before")
	expect(getErrorMessage({ tag: "IsNotAfterDate" })).toEqual("is before")
	expect(getErrorMessage({ tag: "IsNotBeforeDate" })).toEqual("is after")
	expect(getErrorMessage({ tag: "IsNotSameDate" })).toEqual("is the same as")
	expect(getErrorMessage({ tag: "IsSameDate" })).toEqual("is not the same as")
	expect(getErrorMessage({ tag: "IsAfterDateTime" })).toEqual("is not after")
	expect(getErrorMessage({ tag: "IsBeforeDateTime" })).toEqual("is not before")
	expect(getErrorMessage({ tag: "IsAfterTime" })).toEqual("is not after")
	expect(getErrorMessage({ tag: "IsBeforeTime" })).toEqual("is not before")
	expect(getErrorMessage({ tag: "IsNotAfterTime" })).toEqual("is after")
	expect(getErrorMessage({ tag: "IsNotBeforeTime" })).toEqual("is before")
	expect(getErrorMessage({ tag: "IsNotSameTime" })).toEqual("is the same as")
	expect(getErrorMessage({ tag: "IsSameTime" })).toEqual("is not the same as")
	expect(getErrorMessage({ tag: "IsEqualTo" })).toEqual("is not equal to")
	expect(getErrorMessage({ tag: "IsLessThan" })).toEqual("is not less than")
	expect(getErrorMessage({ tag: "IsMoreThan" })).toEqual("is not more than")
	expect(getErrorMessage({ tag: "IsNoLessThan" })).toEqual("is less than")
	expect(getErrorMessage({ tag: "IsNoMoreThan" })).toEqual("is more than")
	expect(getErrorMessage({ tag: "IsUnequalTo" })).toEqual("is not unequal to")
	expect(getErrorMessage({})).toEqual("something something")
})
