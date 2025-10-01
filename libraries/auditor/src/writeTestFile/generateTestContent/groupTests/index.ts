import type { TestCase } from "../../../types/index.ts"

import isEdgeCase from "./isEdgeCase/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function groupTests(tests: Array<TestCase>): {
	unit: Array<TestCase>
	property: Array<TestCase>
	edge: Array<TestCase>
	error: Array<TestCase>
} {
	const groups = {
		unit: [] as Array<TestCase>,
		property: [] as Array<TestCase>,
		edge: [] as Array<TestCase>,
		error: [] as Array<TestCase>,
	}

	tests.forEach((test) => {
		if (test.properties && test.properties.length > 0) {
			groups.property.push(test)
		} else if (test.expectedError) {
			groups.error.push(test)
		} else if (isEdgeCase(test)) {
			groups.edge.push(test)
		} else {
			groups.unit.push(test)
		}
	})

	return groups
}
