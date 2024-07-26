import { expect, test } from "vitest"

import omit from "."

const obj1 = {
	color: "red",
	weight: 120,
}

const obj2 = {
	isOld: true,
	flavors: ["sweet", "salty", "bitter"],
}

test("[omit] (object) returns the object with only the keys specified", () => {
	expect(omit(["color", "weight"])({ ...obj1, ...obj2 })).toMatchObject(obj2)
	expect(omit(["isOld", "flavors"])({ ...obj1, ...obj2 })).toMatchObject(obj1)
})

test("[omit] (object) returns the object unchanged with keys array empty", () => {
	expect(omit([])(obj1)).toMatchObject(obj1)
	expect(omit([])(obj2)).toMatchObject(obj2)
})
