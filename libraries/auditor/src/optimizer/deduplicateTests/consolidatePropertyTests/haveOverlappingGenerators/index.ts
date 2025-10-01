//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import type { TestCase } from "../../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function haveOverlappingGenerators(
	a: TestCase,
	b: TestCase,
): boolean {
	if (!a.properties || !b.properties) return false

	// Check if any generators are the same
	return a.properties.some((aProp) =>
		b.properties.some((bProp) => {
			// Same generator type
			if (aProp.generator === bProp.generator) {
				return true
			}

			// Similar generator types (e.g., fc.array(fc.integer()) and fc.array(fc.nat()))
			if (areGeneratorsSimilar(aProp.generator, bProp.generator)) {
				return true
			}

			return false
		})
	)
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function areGeneratorsSimilar(a: string, b: string): boolean {
	// Both are array generators
	if (a.includes("fc.array") && b.includes("fc.array")) {
		return true
	}

	// Both are numeric generators
	const numericGenerators = ["fc.integer", "fc.nat", "fc.float", "fc.double"]
	const aIsNumeric = numericGenerators.some((gen) => a.includes(gen))
	const bIsNumeric = numericGenerators.some((gen) => b.includes(gen))
	if (aIsNumeric && bIsNumeric) {
		return true
	}

	// Both are string generators
	const stringGenerators = [
		"fc.string",
		"fc.ascii",
		"fc.unicode",
		"fc.hexaString",
	]
	const aIsString = stringGenerators.some((gen) => a.includes(gen))
	const bIsString = stringGenerators.some((gen) => b.includes(gen))
	if (aIsString && bIsString) {
		return true
	}

	return false
}
