// @vitest-environment jsdom

import { expect, test } from "vitest"

import getBySegment from "./"

test("[getBySegment] (injectors::fromUrlParameter) returns an Right(value) when segment found", async () => {
	window.location = {
		pathname: "/name/Bob/age/42",
	}

	const op = {
		datatype: "String",
		options: { segment: 2 },
	}

	expect(await getBySegment(op)).toMatchObject({
		right: "Bob",
	})
})

test("[getBySegment] (injectors::fromUrlParameter) returns Left(Array(Errors)) when bad segment", async () => {
	window.location = {
		pathname: "/name/Bob/age/42",
	}

	const op = {
		datatype: "String",
		options: { segment: undefined },
	}

	expect(await getBySegment(op)).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Segment is not an integer.",
				operation: {
					datatype: "String",
					options: {},
				},
				type: "FromUrlParameter",
			},
		],
	})
})

test("[getBySegment] (injectors::fromUrlParameter) returns Left(Array(Errors)) when wrong segment", async () => {
	window.location = {
		pathname: "/name/Bob/age/42",
	}

	const op = {
		datatype: "String",
		options: { segment: 7 },
	}

	expect(await getBySegment(op)).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Unable to find value at segment 7 in URL path.",
				operation: {
					datatype: "String",
					options: {
						segment: 7,
					},
				},
				type: "FromUrlParameter",
			},
		],
	})
})

test("[getBySegment] (injectors::fromUrlParameter) returns Left(Array(Errors)) when bad cast", async () => {
	window.location = {
		pathname: "/name/Bob/age/42",
	}

	const op = {
		datatype: "Boolean",
		options: { segment: 4 },
	}

	expect(await getBySegment(op)).toMatchObject({
		left: [
			{
				tag: "Error",
				message: [
					{
						tag: "Error",
						message: 'Cannot cast "42" to a boolean.',
						operation: "42",
						type: "castToBoolean",
					},
				],
				operation: {
					datatype: "Boolean",
					options: {
						segment: 4,
					},
				},
				type: "FromUrlParameter",
			},
		],
	})
})
