// @vitest-environment jsdom
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, beforeAll, expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import FromAPI from "../../../injectors/constructors/FromAPI"
import FromArgument from "../../../injectors/constructors/FromArgument"
import FromElement from "../../../injectors/constructors/FromElement"
import FromLocalStorage from "../../../injectors/constructors/FromLocalStorage"
import FromLookup from "../../../injectors/constructors/FromLookup"
import FromLookupTable from "../../../injectors/constructors/FromLookupTable"
import FromQueryString from "../../../injectors/constructors/FromQueryString"
import FromSessionStorage from "../../../injectors/constructors/FromSessionStorage"
import FromUrlParameter from "../../../injectors/constructors/FromUrlParameter"
import And from "../../comparators/algebraic/constructors/And"
import Or from "../../comparators/algebraic/constructors/Or"
import IsAfterAlphabetically from "../../comparators/alphabetical/constructors/IsAfterAlphabetically"
import IsBeforeAlphabetically from "../../comparators/alphabetical/constructors/IsBeforeAlphabetically"
import IsNotAfterAlphabetically from "../../comparators/alphabetical/constructors/IsNotAfterAlphabetically"
import IsNotBeforeAlphabetically from "../../comparators/alphabetical/constructors/IsNotBeforeAlphabetically"
import IsNotSameAlphabetically from "../../comparators/alphabetical/constructors/IsNotSameAlphabetically"
import IsSameAlphabetically from "../../comparators/alphabetical/constructors/IsSameAlphabetically"
import IsLessThan from "../../comparators/amount/constructors/IsLessThan"
import IsMoreThan from "../../comparators/amount/constructors/IsMoreThan"
import IsNoLessThan from "../../comparators/amount/constructors/IsNoLessThan"
import IsNoMoreThan from "../../comparators/amount/constructors/IsNoMoreThan"
import IsAfterDate from "../../comparators/date/constructors/IsAfterDate"
import IsBeforeDate from "../../comparators/date/constructors/IsBeforeDate"
import IsNotAfterDate from "../../comparators/date/constructors/IsNotAfterDate"
import IsNotBeforeDate from "../../comparators/date/constructors/IsNotBeforeDate"
import IsNotSameDate from "../../comparators/date/constructors/IsNotSameDate"
import IsSameDate from "../../comparators/date/constructors/IsSameDate"
import IsAfterDateTime from "../../comparators/dateTime/constructors/IsAfterDateTime"
import IsBeforeDateTime from "../../comparators/dateTime/constructors/IsBeforeDateTime"
import IsEqualTo from "../../comparators/equality/constructors/IsEqualTo"
import IsUnequalTo from "../../comparators/equality/constructors/IsUnequalTo"
import IsLength from "../../comparators/length/constructors/IsLength"
import IsLongerThan from "../../comparators/length/constructors/IsLongerThan"
import IsNoLongerThan from "../../comparators/length/constructors/IsNoLongerThan"
import IsNoShorterThan from "../../comparators/length/constructors/IsNoShorterThan"
import IsNotLength from "../../comparators/length/constructors/IsNotLength"
import IsNotSameLength from "../../comparators/length/constructors/IsNotSameLength"
import IsSameLength from "../../comparators/length/constructors/IsSameLength"
import IsShorterThan from "../../comparators/length/constructors/IsShorterThan"
import DoesNotMatch from "../../comparators/matching/constructors/DoesNotMatch"
import Matches from "../../comparators/matching/constructors/Matches"
import IsInteger from "../../comparators/numerical/constructors/IsInteger"
import IsPrecisionNumber from "../../comparators/numerical/constructors/IsPrecisionNumber"
import IsRealNumber from "../../comparators/numerical/constructors/IsRealNumber"
import IsBoolean from "../../comparators/scalar/constructors/IsBoolean"
import IsNumber from "../../comparators/scalar/constructors/IsNumber"
import IsString from "../../comparators/scalar/constructors/IsString"
import IsAscending from "../../comparators/sequence/constructors/IsAscending"
import IsDescending from "../../comparators/sequence/constructors/IsDescending"
import IsDisjointSet from "../../comparators/set/constructors/IsDisjointSet"
import IsMember from "../../comparators/set/constructors/IsMember"
import IsOverlappingSet from "../../comparators/set/constructors/IsOverlappingSet"
import IsSubset from "../../comparators/set/constructors/IsSubset"
import IsSuperset from "../../comparators/set/constructors/IsSuperset"
import IsCalendar from "../../comparators/temporal/constructors/IsCalendar"
import IsDuration from "../../comparators/temporal/constructors/IsDuration"
import IsInstant from "../../comparators/temporal/constructors/IsInstant"
import IsPlainDate from "../../comparators/temporal/constructors/IsPlainDate"
import IsPlainDateTime from "../../comparators/temporal/constructors/IsPlainDateTime"
import IsPlainMonthDay from "../../comparators/temporal/constructors/IsPlainMonthDay"
import IsPlainTime from "../../comparators/temporal/constructors/IsPlainTime"
import IsPlainYearMonth from "../../comparators/temporal/constructors/IsPlainYearMonth"
import IsTimeZone from "../../comparators/temporal/constructors/IsTimeZone"
import IsYearWeek from "../../comparators/temporal/constructors/IsYearWeek"
import IsZonedDateTime from "../../comparators/temporal/constructors/IsZonedDateTime"
import IsAfterTime from "../../comparators/time/constructors/IsAfterTime"
import IsBeforeTime from "../../comparators/time/constructors/IsBeforeTime"
import IsNotAfterTime from "../../comparators/time/constructors/IsNotAfterTime"
import IsNotBeforeTime from "../../comparators/time/constructors/IsNotBeforeTime"
import IsNotSameTime from "../../comparators/time/constructors/IsNotSameTime"
import IsSameTime from "../../comparators/time/constructors/IsSameTime"
import IsArray from "../../comparators/vector/constructors/IsArray"
import IsMap from "../../comparators/vector/constructors/IsMap"
import IsSet from "../../comparators/vector/constructors/IsSet"
import Ternary from "../../constructors/Ternary"
import composeComparators from "./"

const handlers = [
	http.get("https://example.com/user", () => {
		return HttpResponse.json({ name: "Bob" })
	}),
]

const server = setupServer(...handlers)

beforeAll(() => {
	server.listen({ onUnhandledRequest: "error" })
})

afterAll(() => {
	server.close()
})

test("[composeComparators] (operations::composers) returns Left(Array(Errors)) when fed bad op", () => {
	expect(composeComparators()()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Operation undefined or malformed: undefined.",
				type: "Comparison",
			},
		],
	})
	expect(composeComparators({})()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Operation undefined or malformed: {}.",
				operation: {},
				type: "Comparison",
			},
		],
	})
	expect(composeComparators({ tag: "Nope" })()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: 'Comparison "Nope" does not exist.',
				operation: {
					tag: "Nope",
				},
				type: "Comparison",
			},
		],
	})
})

test("[composeComparators] (operations::composers) returns Left(Array(Errors)) when fed bad operand or test", async () => {
	const good = IsMoreThan("Integer")(Constant()(10))(Constant()(1))

	expect(await composeComparators(good)()).toMatchObject({ right: 10 })

	const badOperand = IsMoreThan("Integer")(Constant()())(Constant()(1))

	expect(await composeComparators(badOperand)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "Number",
				},
				type: "Constant",
			},
			{
				right: 1,
			},
		],
	})

	const badTest = IsMoreThan("Integer")(Constant()(10))(Constant()())

	expect(await composeComparators(badTest)()).toMatchObject({
		left: [
			{
				right: 10,
			},
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "Number",
				},
				type: "Constant",
			},
		],
	})

	const opWrong = IsMoreThan("Integer")(Constant("String")("grizmo"))(
		Constant()(1),
	)

	expect(await composeComparators(opWrong)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "grizmo is not more than 1.",
				operation: {
					tag: "IsMoreThan",
					datatype: "Integer",
					operand: {
						tag: "Constant",
						datatype: "String",
						value: "grizmo",
					},
					test: {
						tag: "Constant",
						datatype: "Number",
						value: 1,
					},
				},
				type: "IsMoreThan",
			},
		],
	})

	const testWrong = IsMoreThan("Integer")(Constant()(10))(
		Constant("String")("grizmo"),
	)

	expect(await composeComparators(testWrong)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "10 is not more than grizmo.",
				operation: {
					tag: "IsMoreThan",
					datatype: "Integer",
					operand: {
						tag: "Constant",
						datatype: "Number",
						value: 10,
					},
					test: {
						tag: "Constant",
						datatype: "String",
						value: "grizmo",
					},
				},
				type: "IsMoreThan",
			},
		],
	})

	const opFailCast = IsMoreThan("Integer")(Constant("Grizmo")(10))(
		Constant()(1),
	)

	expect(await composeComparators(opFailCast)()).toMatchObject({
		left: [
			{
				right: 1,
			},
			{
				tag: "Error",
				message: "Unknown datatype: Grizmo",
				operation: "Grizmo",
				type: "castValue",
			},
		],
	})

	const testFailCast = IsMoreThan("Integer")(Constant()(10))(
		Constant("Grizmo")(1),
	)

	expect(await composeComparators(testFailCast)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Unknown datatype: Grizmo",
				operation: "Grizmo",
				type: "castValue",
			},
			{
				right: 10,
			},
		],
	})

	const bothFailCast = IsMoreThan("Integer")(Constant("Grizmo")(10))(
		Constant("Gribbet")(1),
	)

	expect(await composeComparators(bothFailCast)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Unknown datatype: Gribbet",
				operation: "Gribbet",
				type: "castValue",
			},
			{
				tag: "Error",
				message: "Unknown datatype: Grizmo",
				operation: "Grizmo",
				type: "castValue",
			},
		],
	})
})

test("[composeComparators] (operations::composers) works with injectors", async () => {
	document.body.innerHTML = `
		<input id="test" value="7">
		<input id="lookup" value="9">
		<input name="table" value="[[1,2],[3,4],[5,6]]">
	`
	globalThis.localStorage.setItem("name", "Bob")
	globalThis.sessionStorage.setItem("color", "blue")
	window.location = {
		pathname: "/name/Bob",
		search: "?age=42",
	}

	expect(await composeComparators(Constant()(3))()).toMatchObject({ right: 3 })
	expect(
		await composeComparators(
			FromAPI("Json")({
				method: "GET",
				url: "https://example.com/user",
				options: {
					local: "name",
				},
			}),
		)(),
	).toMatchObject({
		right: { name: "Bob" },
	})
	expect(await composeComparators(FromArgument("Integer"))(5)).toMatchObject({
		right: 5,
	})
	expect(
		await composeComparators(FromElement()({ id: "test" }))(),
	).toMatchObject({ right: 7 })
	expect(
		await composeComparators(FromLocalStorage("String")("name"))(),
	).toMatchObject({
		right: "Bob",
	})
	expect(await composeComparators(FromLookup()("lookup"))()).toMatchObject({
		right: 9,
	})
	expect(
		await composeComparators(
			FromLookupTable()({
				column: Constant()(1),
				tableName: "table",
				test: Constant()(3),
			}),
		)(),
	).toMatchObject({
		right: 4,
	})
	expect(
		await composeComparators(FromQueryString("Integer")("age"))(),
	).toMatchObject({
		right: 42,
	})
	expect(
		await composeComparators(FromSessionStorage("String")("color"))(),
	).toMatchObject({ right: "blue" })
	expect(
		await composeComparators(FromUrlParameter("String")({ segment: 2 }))(),
	).toMatchObject({
		right: "Bob",
	})
})

test("[composeComparators] (operations::composers) works with algebraic comparators", async () => {
	expect(
		await composeComparators(
			And()([
				IsAfterAlphabetically()(Constant("String")("Bob"))(
					Constant("String")("Andy"),
				),
				IsBeforeAlphabetically()(Constant("String")("Bob"))(
					Constant("String")("Charlie"),
				),
				IsNotAfterAlphabetically()(Constant("String")("Bob"))(
					Constant("String")("Bob"),
				),
			]),
		)(),
	).toMatchObject({
		right: "Bob",
	})

	expect(
		await composeComparators(
			Or()([
				IsAfterAlphabetically()(Constant("String")("Bob"))(
					Constant("String")("Charlie"),
				),
				IsBeforeAlphabetically()(Constant("String")("Bob"))(
					Constant("String")("Charlie"),
				),
				IsNotAfterAlphabetically()(Constant("String")("Bob"))(
					Constant("String")("Andy"),
				),
			]),
		)(),
	).toMatchObject({
		right: "Bob",
	})
})

test("[composeComparators] (operations::composers) works with alphabetical comparators", async () => {
	expect(
		await composeComparators(
			IsAfterAlphabetically()(Constant("String")("Bob"))(
				Constant("String")("Andy"),
			),
		)(),
	).toMatchObject({
		right: "Bob",
	})

	expect(
		await composeComparators(
			IsBeforeAlphabetically()(Constant("String")("Bob"))(
				Constant("String")("Charlie"),
			),
		)(),
	).toMatchObject({
		right: "Bob",
	})

	expect(
		await composeComparators(
			IsNotAfterAlphabetically()(Constant("String")("Bob"))(
				Constant("String")("Bob"),
			),
		)(),
	).toMatchObject({
		right: "Bob",
	})

	expect(
		await composeComparators(
			IsNotBeforeAlphabetically()(Constant("String")("Bob"))(
				Constant("String")("Bob"),
			),
		)(),
	).toMatchObject({
		right: "Bob",
	})

	expect(
		await composeComparators(
			IsNotSameAlphabetically()(Constant("String")("Bob"))(
				Constant("String")("Andy"),
			),
		)(),
	).toMatchObject({
		right: "Bob",
	})

	expect(
		await composeComparators(
			IsSameAlphabetically()(Constant("String")("Bob"))(
				Constant("String")("Bob"),
			),
		)(),
	).toMatchObject({
		right: "Bob",
	})
})

test("[composeComparators] (operations::composers) works with alphabetical comparators", async () => {
	expect(
		await composeComparators(
			IsEqualTo()(Constant("String")("Bob"))(Constant("String")("Bob")),
		)(),
	).toMatchObject({
		right: "Bob",
	})

	expect(
		await composeComparators(
			IsLessThan()(Constant("Integer")(7))(Constant("Integer")(9)),
		)(),
	).toMatchObject({
		right: 7,
	})

	expect(
		await composeComparators(
			IsMoreThan()(Constant("Integer")(7))(Constant("Integer")(5)),
		)(),
	).toMatchObject({
		right: 7,
	})

	expect(
		await composeComparators(
			IsNoLessThan()(Constant("Integer")(7))(Constant("Integer")(7)),
		)(),
	).toMatchObject({
		right: 7,
	})

	expect(
		await composeComparators(
			IsNoMoreThan()(Constant("Integer")(7))(Constant("Integer")(7)),
		)(),
	).toMatchObject({
		right: 7,
	})

	expect(
		await composeComparators(
			IsUnequalTo()(Constant("Integer")(7))(Constant("Integer")(3)),
		)(),
	).toMatchObject({
		right: 7,
	})
})

test("[composeComparators] (operations::composers) works with custom ternary", async () => {
	expect(
		await composeComparators(
			Ternary(Constant("Boolean")(true))(Constant("String")("isTrue"))(
				Constant("String")("isFalse"),
			),
		)(),
	).toMatchObject({
		right: "isTrue",
	})
})

test("[composeComparators] (operations::composers) works with date comparators", async () => {
	expect(
		await composeComparators(
			IsAfterDate()(Constant("PlainDate")("2001-09-11"))(
				Constant("PlainDate")("2001-01-01"),
			),
		)(),
	).toMatchObject({
		right: "2001-09-11",
	})

	expect(
		await composeComparators(
			IsBeforeDate()(Constant("PlainDate")("2001-09-11"))(
				Constant("PlainDate")("2001-09-12"),
			),
		)(),
	).toMatchObject({
		right: "2001-09-11",
	})

	expect(
		await composeComparators(
			IsNotAfterDate()(Constant("PlainDate")("2001-09-11"))(
				Constant("PlainDate")("2001-09-11"),
			),
		)(),
	).toMatchObject({
		right: "2001-09-11",
	})

	expect(
		await composeComparators(
			IsNotBeforeDate()(Constant("PlainDate")("2001-09-11"))(
				Constant("PlainDate")("2001-09-11"),
			),
		)(),
	).toMatchObject({
		right: "2001-09-11",
	})

	expect(
		await composeComparators(
			IsNotSameDate()(Constant("PlainDate")("2001-09-11"))(
				Constant("PlainDate")("2001-01-01"),
			),
		)(),
	).toMatchObject({
		right: "2001-09-11",
	})

	expect(
		await composeComparators(
			IsSameDate()(Constant("PlainDate")("2001-09-11"))(
				Constant("PlainDate")("2001-09-11"),
			),
		)(),
	).toMatchObject({
		right: "2001-09-11",
	})
})

test("[composeComparators] (operations::composers) works with dateTime comparators", async () => {
	expect(
		await composeComparators(
			IsAfterDateTime("PlainDateTime")(
				Constant("PlainDateTime")("2001-01-01T12:00:00"),
			)(Constant("PlainDateTime")("2001-01-01T11:00:00")),
		)(),
	).toMatchObject({
		right: "2001-01-01T12:00:00",
	})

	expect(
		await composeComparators(
			IsBeforeDateTime("PlainDateTime")(
				Constant("PlainDateTime")("2001-01-01T12:00:00"),
			)(Constant("PlainDateTime")("2001-01-01T13:00:00")),
		)(),
	).toMatchObject({
		right: "2001-01-01T12:00:00",
	})
})

test("[composeComparators] (operations::composers) works with length comparators", async () => {
	expect(
		await composeComparators(
			IsLength()(Constant("String")("Bob"))(Constant("Integer")(3)),
		)(),
	).toMatchObject({
		right: "Bob",
	})

	expect(
		await composeComparators(
			IsLongerThan()(Constant("String")("Bob"))(Constant("Integer")(2)),
		)(),
	).toMatchObject({
		right: "Bob",
	})

	expect(
		await composeComparators(
			IsNoLongerThan()(Constant("String")("Bob"))(Constant("Integer")(3)),
		)(),
	).toMatchObject({
		right: "Bob",
	})

	expect(
		await composeComparators(
			IsNoShorterThan()(Constant("String")("Bob"))(Constant("Integer")(3)),
		)(),
	).toMatchObject({
		right: "Bob",
	})

	expect(
		await composeComparators(
			IsNotLength()(Constant("String")("Bob"))(Constant("Integer")(7)),
		)(),
	).toMatchObject({
		right: "Bob",
	})

	expect(
		await composeComparators(
			IsNotSameLength()(Constant("String")("Bob"))(Constant("String")("Judy")),
		)(),
	).toMatchObject({
		right: "Bob",
	})

	expect(
		await composeComparators(
			IsSameLength()(Constant("String")("Bob"))(Constant("String")("Sam")),
		)(),
	).toMatchObject({
		right: "Bob",
	})

	expect(
		await composeComparators(
			IsShorterThan()(Constant("String")("Bob"))(Constant("Integer")(4)),
		)(),
	).toMatchObject({
		right: "Bob",
	})
})

test("[composeComparators] (operations::composers) works with matching comparators", async () => {
	expect(
		await composeComparators(Matches(Constant("String")("bob"))("Bob")("i"))(),
	).toMatchObject({
		right: true,
	})

	expect(
		await composeComparators(
			DoesNotMatch(Constant("String")("bob"))("Bob")(""),
		)(),
	).toMatchObject({
		right: true,
	})
})

test("[composeComparators] (operations::composers) works with numerical comparators", async () => {
	expect(
		await composeComparators(IsInteger(Constant("Integer")(42)))(),
	).toMatchObject({
		right: 42,
	})

	expect(
		await composeComparators(
			IsPrecisionNumber(Constant("PrecisionNumber")(42.12))(2),
		)(),
	).toMatchObject({
		right: 42.12,
	})

	expect(
		await composeComparators(IsRealNumber(Constant("RealNumber")(3.1415)))(),
	).toMatchObject({
		right: 3.1415,
	})
})

test("[composeComparators] (operations::composers) works with scalar comparators", async () => {
	expect(
		await composeComparators(IsBoolean(Constant("Boolean")(true)))(),
	).toMatchObject({
		right: true,
	})

	expect(
		await composeComparators(IsNumber(Constant("Number")(3.1415)))(),
	).toMatchObject({
		right: 3.1415,
	})

	expect(
		await composeComparators(IsString(Constant("String")("Bob")))(),
	).toMatchObject({
		right: "Bob",
	})
})

test("[composeComparators] (operations::composers) works with sequence comparators", async () => {
	expect(
		await composeComparators(
			IsAscending()(Constant("Set")(["blue", "cyan", "green", "red"])),
		)(),
	).toMatchObject({
		right: ["blue", "cyan", "green", "red"],
	})

	expect(
		await composeComparators(
			IsDescending()(Constant("Set")(["yellow", "magenta", "cyan", "black"])),
		)(),
	).toMatchObject({
		right: ["yellow", "magenta", "cyan", "black"],
	})
})

test("[composeComparators] (operations::composers) works with set comparators", async () => {
	expect(
		await composeComparators(
			IsDisjointSet()(Constant("Set")(["red", "green", "blue"]))(
				Constant("Set")(["cyan", "magenta", "yellow", "black"]),
			),
		)(),
	).toMatchObject({
		right: ["red", "green", "blue"],
	})

	expect(
		await composeComparators(
			IsMember()(Constant("Set")("magenta"))(
				Constant("Set")(["cyan", "magenta", "yellow", "black"]),
			),
		)(),
	).toMatchObject({
		right: "magenta",
	})

	expect(
		await composeComparators(
			IsOverlappingSet()(Constant("Set")(["red", "green", "blue", "cyan"]))(
				Constant("Set")(["blue", "cyan", "magenta", "yellow", "black"]),
			),
		)(),
	).toMatchObject({
		right: ["red", "green", "blue", "cyan"],
	})

	expect(
		await composeComparators(
			IsSubset()(Constant("Set")(["red", "green", "blue"]))(
				Constant("Set")([
					"red",
					"green",
					"blue",
					"cyan",
					"magenta",
					"yellow",
					"black",
				]),
			),
		)(),
	).toMatchObject({
		right: ["red", "green", "blue"],
	})

	expect(
		await composeComparators(
			IsSuperset()(Constant("Set")(["red", "green", "blue", "cyan"]))(
				Constant("Set")(["blue", "cyan"]),
			),
		)(),
	).toMatchObject({
		right: ["red", "green", "blue", "cyan"],
	})
})

test("[composeComparators] (operations::composers) works with temporal comparators", async () => {
	expect(
		await composeComparators(IsCalendar(Constant("Calendar")("iso8601")))(),
	).toMatchObject({
		right: "iso8601",
	})
	expect(
		await composeComparators(
			IsDuration(Constant("Duration")("P1Y1M1DT1H1M1.1S")),
		)(),
	).toMatchObject({
		right: "P1Y1M1DT1H1M1.1S",
	})
	expect(
		await composeComparators(
			IsInstant(Constant("Instant")("2020-01-01T00:00:00.123456789+05:30")),
		)(),
	).toMatchObject({
		right: "2020-01-01T00:00:00.123456789+05:30",
	})
	expect(
		await composeComparators(
			IsPlainDate(Constant("PlainDate")("2001-01-01")),
		)(),
	).toMatchObject({
		right: "2001-01-01",
	})
	expect(
		await composeComparators(
			IsPlainDateTime(Constant("PlainDateTime")("2001-01-01T00:00:01")),
		)(),
	).toMatchObject({
		right: "2001-01-01T00:00:01",
	})
	expect(
		await composeComparators(
			IsPlainMonthDay(Constant("PlainMonthDay")("2001-01-01")),
		)(),
	).toMatchObject({
		right: "2001-01-01",
	})
	expect(
		await composeComparators(IsPlainTime(Constant("PlainTime")("00:00:01")))(),
	).toMatchObject({
		right: "00:00:01",
	})
	expect(
		await composeComparators(
			IsPlainYearMonth(Constant("PlainYearMonth")("2001-01-01")),
		)(),
	).toMatchObject({
		right: "2001-01-01",
	})
	expect(
		await composeComparators(IsTimeZone(Constant("TimeZone")("UTC")))(),
	).toMatchObject({
		right: "UTC",
	})
	expect(
		await composeComparators(IsYearWeek(Constant("YearWeek")("2020-W53")))(),
	).toMatchObject({
		right: "2020-W53",
	})
	expect(
		await composeComparators(
			IsZonedDateTime(
				Constant("ZonedDateTime")("2022-01-28T19:53+01:00[Europe/Berlin]"),
			),
		)(),
	).toMatchObject({
		right: "2022-01-28T19:53+01:00[Europe/Berlin]",
	})
})

test("[composeComparators] (operations::composers) works with time comparators", async () => {
	expect(
		await composeComparators(
			IsAfterTime()(Constant("PlainTime")("01:00:01"))(
				Constant("PlainTime")("00:00:01"),
			),
		)(),
	).toMatchObject({
		right: "01:00:01",
	})
	expect(
		await composeComparators(
			IsBeforeTime()(Constant("PlainTime")("01:00:01"))(
				Constant("PlainTime")("02:00:01"),
			),
		)(),
	).toMatchObject({
		right: "01:00:01",
	})
	expect(
		await composeComparators(
			IsNotAfterTime()(Constant("PlainTime")("01:00:01"))(
				Constant("PlainTime")("01:00:01"),
			),
		)(),
	).toMatchObject({
		right: "01:00:01",
	})
	expect(
		await composeComparators(
			IsNotBeforeTime()(Constant("PlainTime")("01:00:01"))(
				Constant("PlainTime")("01:00:01"),
			),
		)(),
	).toMatchObject({
		right: "01:00:01",
	})
	expect(
		await composeComparators(
			IsNotSameTime()(Constant("PlainTime")("01:00:01"))(
				Constant("PlainTime")("02:00:01"),
			),
		)(),
	).toMatchObject({
		right: "01:00:01",
	})
	expect(
		await composeComparators(
			IsSameTime()(Constant("PlainTime")("01:00:01"))(
				Constant("PlainTime")("01:00:01"),
			),
		)(),
	).toMatchObject({
		right: "01:00:01",
	})
})

test("[composeComparators] (operations::composers) works with vector comparators", async () => {
	expect(
		await composeComparators(IsArray(Constant("Array")([1, 2, 3])))(),
	).toMatchObject({
		right: [1, 2, 3],
	})
	expect(
		await composeComparators(
			IsMap(
				Constant("Array")([
					["red", "#f00"],
					["green", "#0f0"],
					["blue", "#00f"],
				]),
			),
		)(),
	).toMatchObject({
		right: [
			["red", "#f00"],
			["green", "#0f0"],
			["blue", "#00f"],
		],
	})
	expect(
		await composeComparators(IsSet(Constant("Array")([4, 5, 6])))(),
	).toMatchObject({
		right: [4, 5, 6],
	})
})
