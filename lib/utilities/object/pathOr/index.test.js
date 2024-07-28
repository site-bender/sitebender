import { expect, test } from "vitest"

import pathOr from "."

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

test("[pathOr] (object) returns value when found", () => {
	expect(pathOr("members")("nope")(obj)).toEqual(obj["members"])
	expect(pathOr(["members", 0, "name"])("nope")(obj)).toEqual("Bob")
	expect(pathOr("members.0.favoriteColors.1")("nope")(obj)).toEqual("red")
})

test("[pathOr] (object) returns the or value when not found", () => {
	expect(pathOr("members.2")("nope")(obj)).toEqual("nope")
	expect(pathOr("members.0.name.first")("nope")(obj)).toEqual("nope")
})

test("[pathOr] (object) returns or if source is undefined", () => {
	expect(pathOr("members.2")("nope")()).toEqual("nope")
})

test("[pathOr] (object) returns or if path is empty", () => {
	expect(pathOr("")("nope")()).toEqual("nope")
	expect(pathOr([])("nope")()).toEqual("nope")
})
