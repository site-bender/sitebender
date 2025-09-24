import type { Operand } from "@sitebender/architect-types/index.ts"

import { OPERAND_TYPES } from "@sitebender/architect/constructors/constants/index.ts"

// InSet comparator: checks if operand is a member of the provided set/collection.
// Shape mirrors other two-arg comparators, using operand/test so the compiler collects args.
const InSet = (operand: Operand) => (set: Operand) => ({
	tag: "InSet",
	type: OPERAND_TYPES.comparator,
	datatype: "Boolean",
	operand,
	test: set,
})

export default InSet
