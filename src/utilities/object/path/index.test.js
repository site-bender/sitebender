import { expect, test } from "vitest"

import path from "."

const obj = {
	members: [
		{
			name: "Bob",
			favoriteColors: ["black", "red"],
		},
		{
			name: "Jane",
			favoriteColors: ["chartreuse", "mauve", "pink"],
		},
	],
}

test("[path] (object) returns the value when found", () => {
	expect(path("members")(obj)).toEqual(obj["members"])
	expect(path(["members", 0, "name"])(obj)).toEqual("Bob")
	expect(path("members.0.favoriteColors.1")(obj)).toEqual("red")
})

test("[path] (object) returns undefined when not found", () => {
	expect(path("members.2")(obj)).toBeUndefined()
	expect(path("members.0.name.first")(obj)).toBeUndefined()
})

test("[path] (object) returns undefined if source is None", () => {
	expect(path("members.2")()).toBeUndefined()
})

test("[path] (object) returns undefined if path is empty", () => {
	expect(path("")(obj)).toBeUndefined()
	expect(path([])(obj)).toBeUndefined()
})
