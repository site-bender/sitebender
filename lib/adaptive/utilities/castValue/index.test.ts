import castValue from "."
import { Temporal } from "temporal-polyfill"
import { expect, test } from "vitest"

test("casts the value to the actual type", () => {
	expect(castValue("Boolean")({ right: false })).toMatchObject({ right: false })
	expect(castValue("Boolean")({ right: true })).toMatchObject({ right: true })
	expect(castValue("Boolean")({ right: "false" })).toMatchObject({
		right: false,
	})
	expect(castValue("Boolean")({ right: "true" })).toMatchObject({ right: true })
	expect(castValue("Boolean")({ right: "f" })).toMatchObject({ right: false })
	expect(castValue("Boolean")({ right: "t" })).toMatchObject({ right: true })
	expect(castValue("Boolean")({ right: 0 })).toMatchObject({ right: false })
	expect(castValue("Boolean")({ right: 1 })).toMatchObject({ right: true })
	expect(castValue("Boolean")({ right: {} })).toMatchObject({
		left: [
			{
				message: "Cannot cast {} to a boolean.",
				operation: {},
				tag: "Error",
				type: "castToBoolean",
			},
		],
	})

	expect(castValue("Integer")({ right: -66 })).toMatchObject({ right: -66 })
	expect(castValue("Integer")({ right: 66 })).toMatchObject({ right: 66 })
	expect(castValue("Integer")({ right: "+66" })).toMatchObject({ right: 66 })
	expect(castValue("Integer")({ right: 6.66 })).toMatchObject({
		left: [
			{
				message: "Cannot cast 6.66 to an integer.",
				operation: 6.66,
				tag: "Error",
				type: "castToInteger",
			},
		],
	})
	expect(castValue("Integer")({ right: Number.NaN })).toMatchObject({
		left: [
			{
				message: "Cannot cast null to an integer.",
				operation: NaN,
				tag: "Error",
				type: "castToInteger",
			},
		],
	})

	expect(castValue("Number")({ right: -66 })).toMatchObject({ right: -66 })
	expect(castValue("Number")({ right: "55" })).toMatchObject({ right: 55 })
	expect(castValue("Number")({ right: "+55.123" })).toMatchObject({
		right: 55.123,
	})
	expect(castValue("Number")({ right: Number.NaN })).toMatchObject({
		left: [
			{
				message: "Cannot cast null to a number.",
				operation: NaN,
				tag: "Error",
				type: "castToNumber",
			},
		],
	})

	expect(castValue("Percent")({ right: -66 })).toMatchObject({ right: -0.66 })
	expect(castValue("Percent")({ right: "55" })).toMatchObject({ right: 0.55 })
	expect(castValue("Percent")({ right: "+55.123" })).toMatchObject({
		right: 0.55123,
	})
	expect(castValue("Percent")({ right: Number.NaN })).toMatchObject({
		left: [
			{
				message: "Cannot cast null to a percent.",
				operation: NaN,
				tag: "Error",
				type: "castToPercent",
			},
		],
	})

	expect(castValue("String")({ right: -66.6 })).toMatchObject({
		right: "-66.6",
	})
	expect(castValue("String")({ right: "+66.66" })).toMatchObject({
		right: "+66.66",
	})
	expect(castValue("String")({ right: true })).toMatchObject({ right: "true" })
	expect(castValue("String")({ right: false })).toMatchObject({
		right: "false",
	})
	expect(castValue("String")({ right: [] })).toMatchObject({
		left: [
			{
				message: "Cannot cast [] to a string.",
				operation: [],
				tag: "Error",
				type: "castToString",
			},
		],
	})

	expect(castValue("PlainDate")({ right: "2001-09-11" })).toMatchObject({
		right: Temporal.PlainDate.from("2001-09-11"),
	})
	expect(castValue("PlainDate")({ right: "1999-011-333" })).toMatchObject({
		left: [
			{
				message:
					"Cannot cast 1999-011-333 to a plain date: Cannot parse: 1999-011-333.",
				operation: "1999-011-333",
				tag: "Error",
				type: "castToPlainDate",
			},
		],
	})

	expect(
		castValue("PlainDateTime")({ right: "2001-09-11T00:00:00.123" }),
	).toMatchObject({
		right: Temporal.PlainDateTime.from("2001-09-11T00:00:00.123"),
	})
	expect(castValue("PlainDateTime")({ right: "1999-01-01T00" })).toMatchObject({
		right: Temporal.PlainDateTime.from("1999-01-01T00:00:00"),
	})

	expect(
		castValue("ZonedDateTime")({ right: "2020-08-05T20:06:13+05:45[+05:45]" }),
	).toMatchObject({
		right: Temporal.ZonedDateTime.from("2020-08-05T20:06:13+05:45[+05:45]"),
	})

	expect(
		castValue("Json")({ right: `{"name":"Bob","age":42,"isGuru":true}` }),
	).toMatchObject({
		right: {
			name: "Bob",
			age: 42,
			isGuru: true,
		},
	})
	expect(castValue("Json")({ right: `{"name":"Bob","` })).toMatchObject({
		left: [
			{
				tag: "Error",
				message:
					"Cannot parse JSON: SyntaxError: Unterminated string in JSON at position 15 (line 1 column 16).",
				operation: '{"name":"Bob","',
				type: "parseJson",
			},
		],
	})

	expect(castValue("Grizmo")({ right: "Gribbet" })).toMatchObject({
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
