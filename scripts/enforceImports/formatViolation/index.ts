import type { AliasViolation } from "../../types/index.ts"

//++ Formats a single violation as a string
export default function formatViolation(v: AliasViolation): string {
	return `${v.file}:${v.line} -> '${v.spec}'  (${v.hint})`
}