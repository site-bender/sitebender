import { expect, test } from "vitest"

import getFromLocal from "."

const localValues = {
	name: "Bob",
}

test(`[getFromLocal] (utilities::getValue) returns Right(value) from options.local`, () => {
	expect(
		getFromLocal({
			options: {
				local: "name",
			},
		})(localValues),
	).toMatchObject({ right: "Bob" })
})

test(`[getFromLocal] (utilities::getValue) returns Right(value) from options.id`, () => {
	expect(
		getFromLocal({
			options: {
				id: "name",
			},
		})(localValues),
	).toMatchObject({ right: "Bob" })
})

test(`[getFromLocal] (utilities::getValue) returns Right(value) from options.name`, () => {
	expect(
		getFromLocal({
			options: {
				name: "name",
			},
		})(localValues),
	).toMatchObject({ right: "Bob" })
})

test(`[getFromLocal] (utilities::getValue) returns Right(value) from source.local`, () => {
	expect(
		getFromLocal({
			source: {
				local: "name",
			},
		})(localValues),
	).toMatchObject({ right: "Bob" })
})

test(`[getFromLocal] (utilities::getValue) returns Right(value) from source.id`, () => {
	expect(
		getFromLocal({
			source: {
				id: "name",
			},
		})(localValues),
	).toMatchObject({ right: "Bob" })
})

test(`[getFromLocal] (utilities::getValue) returns Right(value) from source.name`, () => {
	expect(
		getFromLocal({
			source: {
				name: "name",
			},
		})(localValues),
	).toMatchObject({ right: "Bob" })
})

test(`[getFromLocal] (utilities::getValue) returns Left(Array(Errors)) on missing value`, () => {
	expect(
		getFromLocal({
			options: {
				local: "age",
			},
		})(localValues),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Cannot find local value at key: age.",
				operation: {
					options: {
						local: "age",
					},
				},
				type: "getFromLocal",
			},
		],
	})
})

test(`[getFromLocal] (utilities::getValue) returns Left(Array(Errors)) when options/source undefined`, () => {
	expect(getFromLocal({})(localValues)).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Cannot find local value at key: undefined.",
				operation: {},
				type: "getFromLocal",
			},
		],
	})
})

test(`[getFromLocal] (utilities::getValue) returns undefined when localVariables missing`, () => {
	expect(
		getFromLocal({
			options: {
				local: "age",
			},
		})(),
	).toBeUndefined()
})
