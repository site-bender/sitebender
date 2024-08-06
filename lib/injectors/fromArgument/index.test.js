import { expect, test } from "vitest"

import composeOperators from "../../calculations/composers/composeOperators"
import FromArgument from "../constructors/FromArgument"

test("[fromArgument] (injectors) returns an Right argument when argument passed", async () => {
	expect(await composeOperators(FromArgument("Integer"))(33)).toMatchObject({
		right: 33,
	})
})

test("[fromArgument] (injectors) returns a Left Error when argument undefined", async () => {
	expect(await composeOperators(FromArgument("Integer"))()).toMatchObject({
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
	})
})
