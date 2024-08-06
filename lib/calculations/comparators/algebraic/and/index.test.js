import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import FromElement from "../../../../injectors/constructors/FromElement"
import And from "../constructors/And"
import and from "./"

test("[and] (calculations::comparators::algebraic) returns Right if all operands are Rights", async () => {
	expect(
		await and(
			And("Number")([
				Constant("Boolean")(true),
				Constant("Boolean")(true),
				Constant("Boolean")(true),
				Constant("Boolean")(true),
			]),
		)(),
	).toMatchObject({ right: true })
})

test("[and] (calculations::comparators::algebraic) returns Left if any operand is a Left", async () => {
	expect(
		await and(
			And("Number")([
				Constant("Boolean")(true),
				FromElement("Boolean")(),
				Constant("Boolean")(true),
			]),
		)(),
	).toMatchObject({
		left: [
			{
				right: true,
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
				right: true,
			},
		],
	})
})
