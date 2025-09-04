import type { InjectorConfig } from "../../../../../engine/types/index.ts"
import type { VariableMap } from "../../../../src/types/index.ts"

/**
 * Creates a test variable map with Constant injectors
 */
export default function createTestVariables(
	values: Record<string, number>,
	datatype: InjectorConfig["datatype"] = "Number",
): VariableMap {
	const variables: VariableMap = {}

	for (const [name, value] of Object.entries(values)) {
		variables[name] = {
			tag: "Constant",
			type: "injector",
			datatype,
			value,
		}
	}

	return variables
}