import type { Operand } from "@adaptiveTypes/index.ts"
import { OPERAND_TYPES } from "@adaptiveSrc/constructors/constants/index.ts"

const Matches = (operand: Operand) => (pattern: Operand) => (flags?: string) => ({
	tag: "Matches" as const,
	type: OPERAND_TYPES.comparator,
	datatype: "String" as const,
	flags,
	operand,
	pattern,
})

export default Matches
