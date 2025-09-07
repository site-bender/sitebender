import { parseFormula } from "../../src/index.ts"
import type { DemoResult } from "../types/index.ts"

// Creates a demo result by parsing the formula with given variables
export default function createDemo(
	title: string,
	formula: string,
	variables: Record<string, unknown>,
	description?: string
): DemoResult {
	return {
		title,
		formula,
		result: parseFormula(formula, variables),
		description
	}
}