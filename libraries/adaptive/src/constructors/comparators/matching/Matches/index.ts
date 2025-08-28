import type { Operand } from "@adaptiveTypes/index.ts"
import { OPERAND_TYPES } from "@adaptiveSrc/constructors/constants/index.ts"

const Matches = (operand: Operand) => (pattern: Operand) => (flags?: string) => ({
	tag: "Matches",
	type: OPERAND_TYPES.comparator,
	datatype: "String",
	flags,
	operand,
	pattern,
})

export default Matches
