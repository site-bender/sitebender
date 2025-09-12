//++ Formats a function definition from the contract into markdown

import type { Section } from "../section/index.ts"
import type { FunctionDefinition } from "./types/index.ts"

export default function formatFunction(func: FunctionDefinition): Section {
	return [
		`#### \`${func.name}\``,
		"",
		`**Signature:** \`${func.signature}\``,
		"",
		func.description,
		"",
	]
}
