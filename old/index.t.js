import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsNotBeforeDate from "../constructors/IsNotBeforeDate"
import isNotBeforeDate from "."

test("[isNotBeforeDate] (calculations::comparators::date) returns an error when not not before date", async () => {
	expect(
		await isNotBeforeDate(
			IsNotBeforeDate("PlainDate")(Constant("PlainDate")("2001-09-11"))(
				Constant("PlainDate")("2001-01-01"),
			),
		)(),
	).toMatchObject({ right: "2001-09-11" })
})

test("[isNotBeforeDate] (calculations::comparators::date) returns an error when not not before date", async () => {
	expect(
		await isNotBeforeDate(
			IsNotBeforeDate("PlainDate")(Constant("PlainDate")("2001-01-01"))(
				Constant("PlainDate")("2001-09-11"),
			),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "2001-01-01 is not not before 2001-09-11.",
				operation: {
					datatype: "PlainDate",
					operand: {
						datatype: "PlainDate",
						tag: "Constant",
						value: "2001-01-01",
					},
					tag: "IsNotBeforeDate",
					test: {
						datatype: "PlainDate",
						tag: "Constant",
						value: "2001-09-11",
					},
				},
				type: "IsNotBeforeDate",
			},
		],
	})
})

test("[isNotBeforeDate] (calculations::comparators::date) returns an error when same date", async () => {
	expect(
		await isNotBeforeDate(
			IsNotBeforeDate("PlainDate")(Constant("PlainDate")("2001-01-01"))(
				Constant("PlainDate")("2001-01-01"),
			),
		)(),
	).toMatchObject({
		right: "2001-01-01",
	})
})

test("[isNotBeforeDate] (calculations::comparators::date) returns an error on bad operand", async () => {
	expect(
		await isNotBeforeDate(
			IsNotBeforeDate("PlainDate")(Constant("PlainDate")())(
				Constant("PlainDate")("2001-09-11"),
			),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "PlainDate",
				},
				type: "Constant",
			},
			{
				right: "2001-09-11",
			},
		],
	})
})

test("[isNotBeforeDate] (calculations::comparators::date) returns an error on bad test", async () => {
	expect(
		await isNotBeforeDate(
			IsNotBeforeDate("PlainDate")(Constant("PlainDate")("2001-09-11"))(
				Constant("PlainDate")(),
			),
		)(),
	).toMatchObject({
		left: [
			{
				right: "2001-09-11",
			},
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "PlainDate",
				},
				type: "Constant",
			},
		],
	})
})

test("[isNotBeforeDate] (calculations::comparators::date) returns an error both bad", async () => {
	expect(
		await isNotBeforeDate(
			IsNotBeforeDate("PlainDate")(Constant("PlainDate")())(
				Constant("PlainDate")(),
			),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "PlainDate",
				},
				type: "Constant",
			},
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "PlainDate",
				},
				type: "Constant",
			},
		],
	})
})

test("[isNotBeforeDate] (calculations::comparators::date) returns an error on bad operand", async () => {
	expect(
		await isNotBeforeDate(
			IsNotBeforeDate("PlainDate")(Constant("PlainDate")("grizmo"))(
				Constant("PlainDate")("2001-09-11"),
			),
		)(),
	).toMatchObject({
		left: [
			{
				right: "2001-09-11",
			},
			{
				tag: "Error",
				message:
					"Cannot cast grizmo to a date: RangeError: Invalid time value.",
				operation: "grizmo",
				type: "castToDate",
			},
		],
	})
})

test("[isNotBeforeDate] (calculations::comparators::date) returns an error on bad test", async () => {
	expect(
		await isNotBeforeDate(
			IsNotBeforeDate("PlainDate")(Constant("PlainDate")("2001-09-11"))(
				Constant("PlainDate")("grizmo"),
			),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message:
					"Cannot cast grizmo to a date: RangeError: Invalid time value.",
				operation: "grizmo",
				type: "castToDate",
			},
			{
				right: "2001-09-11",
			},
		],
	})
})

test("[isNotBeforeDate] (calculations::comparators::date) returns an error both bad", async () => {
	expect(
		await isNotBeforeDate(
			IsNotBeforeDate("PlainDate")(Constant("PlainDate")("grizmo"))(
				Constant("PlainDate")("grizmo"),
			),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message:
					"Cannot cast grizmo to a date: RangeError: Invalid time value.",
				operation: "grizmo",
				type: "castToDate",
			},
			{
				tag: "Error",
				message:
					"Cannot cast grizmo to a date: RangeError: Invalid time value.",
				operation: "grizmo",
				type: "castToDate",
			},
		],
	})
})
