//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import type { TestCase } from "../../../types/index.ts"

import isEdgeCaseCoveredByProperty from "./isEdgeCaseCoveredByProperty/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function removeRedundantEdgeCases(
	tests: Array<TestCase>,
): Array<TestCase> {
	const propertyTests = tests.filter((t) =>
		t.properties && t.properties.length > 0
	)
	const nonPropertyTests = tests.filter((t) =>
		!t.properties || t.properties.length === 0
	)

	const filtered = nonPropertyTests.filter((test) =>
		!propertyTests.some((propTest) =>
			isEdgeCaseCoveredByProperty(test, propTest)
		)
	)

	return [...propertyTests, ...filtered]
}
