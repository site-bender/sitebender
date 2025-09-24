//++ Prints a single violation line for enforceFunctionalProgramming
import type { Violation } from "../../../../types/enforcement/Violation.ts"

export default function printViolation(v: Violation): Violation {
	console.error(`${v.file}:${v.line}:${v.col}  [${v.rule}]  ${v.snippet}`)

	return v
}
