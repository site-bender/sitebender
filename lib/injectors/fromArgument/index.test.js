import { expect, test } from "vitest"

import composeOperators from "../../operations/composers/composeOperators"
import FromArgument from "../constructors/FromArgument"

test("[fromArgument] (injectors) returns an Right argument when argument passed", async () => {
	expect(await composeOperators(FromArgument("Integer"))(33)).toMatchObject({
		right: 33,
	})
	expect(await composeOperators(FromArgument("String"))("Bob")).toMatchObject({
		right: "Bob",
	})
})

test("[fromArgument] (injectors) returns a Left(Array(Errors)) when not a number", async () => {
	expect(await composeOperators(FromArgument("Integer"))("jeff")).toMatchObject(
		{
			left: [
				{
					tag: "Error",
					message: "Value is not a number.",
					operation: {
						tag: "FromArgument",
						datatype: "Integer",
					},
					type: "FromArgument",
				},
			],
		},
	)
})

test("[fromArgument] (injectors) returns a Left(Array(Errors)) Error when argument undefined", async () => {
	expect(await composeOperators(FromArgument("Integer"))()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Argument is missing.",
				operation: {
					tag: "FromArgument",
					datatype: "Integer",
				},
				type: "FromArgument",
			},
		],
	})
})
