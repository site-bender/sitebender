import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import FromElement from "../../../../injectors/constructors/FromElement"
import Or from "../constructors/Or"
import or from "./"

test("[or] (calculations::comparators::algebraic) returns Right if any operand is a Right", () => {
	expect(
		or(
			Or("Number")([
				FromElement("Boolean")(),
				Constant("Boolean")(true),
				FromElement("Boolean")(),
				FromElement("Boolean")(),
			]),
		)(),
	).toMatchObject({ right: true })
})

test("[or] (calculations::comparators::algebraic) returns Left if all operands are Lefts", () => {
	expect(
		or(
			Or("Number")([
				FromElement("Boolean")(),
				FromElement("Boolean")(),
				FromElement("Boolean")(),
				FromElement("Boolean")(),
			]),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: [
					{
						tag: "Error",
						message: "Must provide a selector by which to select element.",
						operation: {
							tag: "FromElement",
							datatype: "Boolean",
						},
						type: "FromElement",
					},
				],
				operation: {
					tag: "FromElement",
					datatype: "Boolean",
				},
				type: "FromElement",
			},
			{
				tag: "Error",
				message: [
					{
						tag: "Error",
						message: "Must provide a selector by which to select element.",
						operation: {
							tag: "FromElement",
							datatype: "Boolean",
						},
						type: "FromElement",
					},
				],
				operation: {
					tag: "FromElement",
					datatype: "Boolean",
				},
				type: "FromElement",
			},
			{
				tag: "Error",
				message: [
					{
						tag: "Error",
						message: "Must provide a selector by which to select element.",
						operation: {
							tag: "FromElement",
							datatype: "Boolean",
						},
						type: "FromElement",
					},
				],
				operation: {
					tag: "FromElement",
					datatype: "Boolean",
				},
				type: "FromElement",
			},
			{
				tag: "Error",
				message: [
					{
						tag: "Error",
						message: "Must provide a selector by which to select element.",
						operation: {
							tag: "FromElement",
							datatype: "Boolean",
						},
						type: "FromElement",
					},
				],
				operation: {
					tag: "FromElement",
					datatype: "Boolean",
				},
				type: "FromElement",
			},
		],
	})
})
