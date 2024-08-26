import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import FromArgument from "../../../injectors/constructors/FromArgument"
import ProportionedRate from "../constructors/ProportionedRate"
import proportionedRate from "."

test("[proportionedRate] (operations::operators) works", async () => {
	const pr = ProportionedRate()(
		Constant("Json")("[[1000000,2.25],[6500000,1.62],[null,1.8],[-50000,1.2]]"),
	)(FromArgument())

	expect(await proportionedRate(pr)(7_600_000)).toMatchObject({
		right: 1.7052631578947368,
	})
})

test("[proportionedRate] (operations::operators) works", async () => {
	const pr = ProportionedRate()(
		Constant("Array")([
			[1000000, 2.25],
			[6500000, 1.62],
			[null, 1.8],
		]),
	)(FromArgument())

	expect(await proportionedRate(pr)(7_600_000)).toMatchObject({
		right: 1.7052631578947368,
	})
})

test("[proportionedRate] (operations::operators) returns Left(Array(Errors)) on bad table", async () => {
	const op = ProportionedRate()(Constant("Json")("[[]"))(Constant()(7_600_000))

	expect(await proportionedRate(op)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message:
					"Failed to parse JSON table: SyntaxError: Expected ',' or ']' after array element in JSON at position 3 (line 1 column 4)",
				operation: {
					tag: "ProportionedRate",
					amount: {
						tag: "Constant",
						datatype: "Number",
						value: 7600000,
					},
					datatype: "Number",
					table: {
						tag: "Constant",
						datatype: "Json",
						value: "[[]",
					},
				},
				type: "ProportionedRate",
			},
		],
	})
})

test("[proportionedRate] (operations::operators) returns Left(Array(Errors)) when table not array", async () => {
	const op = ProportionedRate()(Constant("Json")(`{"red":"#f00"}`))(
		Constant()(7_600_000),
	)

	expect(await proportionedRate(op)()).toMatchObject({
		left: [
			{
				right: '{"red":"#f00"}',
			},
			{
				right: 7600000,
			},
			{
				tag: "Error",
				message: "Table is not an array.",
				operation: {
					tag: "ProportionedRate",
					amount: {
						tag: "Constant",
						datatype: "Number",
						value: 7600000,
					},
					datatype: "Number",
					table: {
						tag: "Constant",
						datatype: "Json",
						value: '{"red":"#f00"}',
					},
				},
				type: "ProportionedRate",
			},
		],
	})
})

test("[proportionedRate] (operations::operators) returns Left(Array(Errors)) on missing table", async () => {
	const op = ProportionedRate()(Constant("Json")())(Constant()(7_600_000))

	expect(await proportionedRate(op)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "Json",
				},
				type: "Constant",
			},
			{
				right: 7600000,
			},
		],
	})
})

test("[proportionedRate] (operations::operators) returns Left(Array(Errors)) on bad amount", async () => {
	const op = ProportionedRate()(
		Constant("Json")("[[1000000,2.25],[6500000,1.62],[null,1.8]]"),
	)(Constant()())

	expect(await proportionedRate(op)()).toMatchObject({
		left: [
			{
				right: "[[1000000,2.25],[6500000,1.62],[null,1.8]]",
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
})
