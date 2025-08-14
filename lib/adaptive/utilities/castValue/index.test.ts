import { assertEquals } from "jsr:@std/assert"

import castValue from "./index.ts"

import type {
	AdaptiveError,
	Datatype,
	Either,
	Value,
} from "../../types/index.ts"

Deno.test("casts the value to the actual type", () => {
	assertEquals(castValue("Boolean")({ right: false }), { right: false })
	assertEquals(castValue("Boolean")({ right: true }), { right: true })
	assertEquals(castValue("Boolean")({ right: "false" }), { right: false })
	assertEquals(castValue("Boolean")({ right: "true" }), { right: true })
	assertEquals(castValue("Boolean")({ right: "f" }), { right: false })
	assertEquals(castValue("Boolean")({ right: "t" }), { right: true })
	assertEquals(castValue("Boolean")({ right: 0 }), { right: false })
	assertEquals(castValue("Boolean")({ right: 1 }), { right: true })
	assertEquals(castValue("Boolean")({ right: {} }), {
		left: [
			{
				message: "Cannot cast {} to a boolean.",
				operation: "castToBoolean",
				tag: "Error",
				type: "Boolean",
			},
		],
	})

	assertEquals(castValue("Integer")({ right: -66 }), { right: -66 })
	assertEquals(castValue("Integer")({ right: 66 }), { right: 66 })
	assertEquals(castValue("Integer")({ right: "+66" }), { right: 66 })
	assertEquals(castValue("Integer")({ right: 6.66 }), {
		left: [
			{
				message: "Cannot cast 6.66 to an integer.",
				operation: "castToInteger",
				tag: "Error",
				type: "Integer",
			},
		],
	})
	assertEquals(castValue("Integer")({ right: Number.NaN }), {
		left: [
			{
				message: "Cannot cast null to an integer.",
				operation: "castToInteger",
				tag: "Error",
				type: "Integer",
			},
		],
	})

	assertEquals(castValue("Number")({ right: -66 }), { right: -66 })
	assertEquals(castValue("Number")({ right: "55" }), { right: 55 })
	assertEquals(castValue("Number")({ right: "+55.123" }), {
		right: 55.123,
	})
	assertEquals(castValue("Number")({ right: Number.NaN }), {
		left: [
			{
				message: "Cannot cast null to a number.",
				operation: "castToNumber",
				tag: "Error",
				type: "Number",
			},
		],
	})

	assertEquals(castValue("Percent")({ right: -66 }), { right: -0.66 })
	assertEquals(castValue("Percent")({ right: "55" }), { right: 0.55 })
	assertEquals(castValue("Percent")({ right: "+55.123" }), {
		right: 0.55123,
	})
	assertEquals(castValue("Percent")({ right: Number.NaN }), {
		left: [
			{
				message: "Cannot cast null to a percent.",
				operation: "castToPercent",
				tag: "Error",
				type: "Percent",
			},
		],
	})

	assertEquals(castValue("String")({ right: -66.6 }), {
		right: "-66.6",
	})
	assertEquals(castValue("String")({ right: "+66.66" }), {
		right: "+66.66",
	})
	assertEquals(castValue("String")({ right: true }), { right: "true" })
	assertEquals(castValue("String")({ right: false }), {
		right: "false",
	})
	assertEquals(castValue("String")({ right: [] }), {
		left: [
			{
				message: "Cannot cast [] to a string.",
				operation: "castToString",
				tag: "Error",
				type: "String",
			},
		],
	})

	assertEquals(castValue("PlainDate")({ right: "2001-09-11" }), {
		right: Temporal.PlainDate.from("2001-09-11"),
	})
	const plainDateResult = castValue("PlainDate")({ right: "1999-011-333" })
	assertEquals(plainDateResult.left?.[0]?.tag, "Error")
	assertEquals(plainDateResult.left?.[0]?.operation, "castToPlainDate")
	assertEquals(plainDateResult.left?.[0]?.type, "PlainDate")
	assertEquals(plainDateResult.left?.[0]?.message?.includes("Cannot cast 1999-011-333 to a plain date"), true)

	assertEquals(
		castValue("PlainDateTime")({ right: "2001-09-11T00:00:00.123" }),
		{
			right: Temporal.PlainDateTime.from("2001-09-11T00:00:00.123"),
		}
	)
	assertEquals(castValue("PlainDateTime")({ right: "1999-01-01T00" }), {
		right: Temporal.PlainDateTime.from("1999-01-01T00:00:00"),
	})

	assertEquals(
		castValue("ZonedDateTime")({ right: "2020-08-05T20:06:13+05:45[+05:45]" }),
		{
			right: Temporal.ZonedDateTime.from("2020-08-05T20:06:13+05:45[+05:45]"),
		}
	)

	assertEquals(
		castValue("Json")({ right: `{"name":"Bob","age":42,"isGuru":true}` }),
		{
			right: {
				name: "Bob",
				age: 42,
				isGuru: true,
			},
		}
	)
	const jsonResult = castValue("Json")({ right: `{"name":"Bob","` })
	assertEquals(jsonResult.left?.[0]?.tag, "Error")
	assertEquals(jsonResult.left?.[0]?.operation, "parseJson")
	assertEquals(jsonResult.left?.[0]?.type, "JSON")
	assertEquals(jsonResult.left?.[0]?.message?.includes("Cannot parse JSON"), true)

	assertEquals(castValue("Grizmo")({ right: "Gribbet" }), {
		left: [
			{
				tag: "Error",
				message: "Unknown datatype: Grizmo",
				operation: "Grizmo",
				type: "castValue",
			},
		],
	})
})
