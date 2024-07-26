import { expect, test } from "vitest"

import pick from "."

const obj1 = {
	color: "red",
	weight: 120,
}

const obj2 = {
	isOld: true,
	flavors: ["sweet", "salty", "bitter"],
}

test("[pick] (object) returns the object with only the keys specified", () => {
	expect(pick(["color", "weight"])({ ...obj1, ...obj2 })).toMatchObject(obj1)
	expect(pick(["isOld", "flavors"])({ ...obj1, ...obj2 })).toMatchObject(obj2)
})

test("[pick] (object) returns an empty object when provided no keys", () => {
	expect(pick([])(obj1)).toMatchObject({})
	expect(pick([])(obj2)).toMatchObject({})
})
