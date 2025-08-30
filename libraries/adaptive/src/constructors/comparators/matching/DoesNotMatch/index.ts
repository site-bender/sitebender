import type { Operand } from "@adaptiveTypes/index.ts"
import { OPERAND_TYPES } from "@adaptiveSrc/constructors/constants/index.ts"

const DoesNotMatch = (operand: Operand) => (pattern: Operand) => (flags?: string) => ({
	tag: "DoesNotMatch" as const,
		type: OPERAND_TYPES.comparator,
		datatype: "String" as const,
	flags,
	operand,
	pattern,
})

export default DoesNotMatch
