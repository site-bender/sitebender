import { expect, test } from "vitest"

import isBoolean from "../isBoolean"
import isCharacter from "../isCharacter"
import isInteger from "../isInteger"
import isMemberOf from "../isMemberOf"
import isNumber from "../isNumber"
import isString from "../isString"
import filterAttribute from "."

const attributes = {
	boolean: false,
	character: "C",
	integer: 42,
	member: "red",
	number: 3.1415,
	string: "string",
}

const badAtts = {
	boolean: "true",
	character: "ABC",
	integer: 3.1415,
	member: "cyan",
	number: "123",
	string: true,
}

const COLORS = ["red", "green", "blue"]

test("[filterAttribute] (guards) returns attribute when it passes the guard", () => {
	expect(filterAttribute(isBoolean)("test")(attributes.boolean)).toMatchObject({
		test: attributes.boolean,
	})
	expect(
		filterAttribute(isCharacter)("test")(attributes.character),
	).toMatchObject({
		test: attributes.character,
	})
	expect(filterAttribute(isInteger)("test")(attributes.integer)).toMatchObject({
		test: attributes.integer,
	})
	expect(
		filterAttribute(isMemberOf(COLORS))("test")(attributes.member),
	).toMatchObject({
		test: attributes.member,
	})
	expect(filterAttribute(isNumber)("test")(attributes.number)).toMatchObject({
		test: attributes.number,
	})
	expect(filterAttribute(isString)("test")(attributes.string)).toMatchObject({
		test: attributes.string,
	})
})

test("[filterAttribute] (guards) does not return attribute when it fails the guard", () => {
	expect(filterAttribute(isBoolean)("test")(badAtts.boolean)).toMatchObject({})
	expect(filterAttribute(isCharacter)("test")(badAtts.character)).toMatchObject(
		{},
	)
	expect(filterAttribute(isInteger)("test")(badAtts.integer)).toMatchObject({})
	expect(
		filterAttribute(isMemberOf(COLORS))("test")(badAtts.member),
	).toMatchObject({})
	expect(filterAttribute(isNumber)("test")(badAtts.number)).toMatchObject({})
	expect(filterAttribute(isString)("test")(badAtts.string)).toMatchObject({})
})
