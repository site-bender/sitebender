import type { Operand } from "@engineTypes/index.ts"

import { OPERAND_TYPES } from "@engineSrc/constructors/constants/index.ts"

const Matches =
	(operand: Operand) => (pattern: Operand) => (flags?: string) => ({
		tag: "Matches" as const,
		type: OPERAND_TYPES.comparator,
		datatype: "String" as const,
		flags,
		operand,
		pattern,
	})

export default Matches
