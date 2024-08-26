import { expect, test } from "vitest"

import collectDependencies from "./"

test("[collectDependencies] (utilities) returns the collected dependencies", () => {
	const condition = {
		tag: "IsEqualTo",
		datatype: "String",
		operand: {
			tag: "FromElement",
			datatype: "String",
			source: {
				id: "testElement",
			},
		},
		test: {
			tag: "Constant",
			datatype: "String",
			value: "yes",
		},
	}

	expect(collectDependencies(condition)).toMatchObject(["#testElement"])
})

test("[collectDependencies] (utilities) returns an empty array if no condition", () => {
	const condition = ""

	expect(collectDependencies(condition)).toMatchObject([])
})
