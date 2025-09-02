import type { Datatype, Operand } from "@adaptiveTypes/index.ts"

import { OPERAND_TYPES } from "@adaptiveSrc/constructors/constants/index.ts"

const IsUnequalTo =
	(datatype: Datatype = "String") => (operand: Operand) => (test: Operand) => ({
		tag: "IsUnequalTo" as const,
		type: OPERAND_TYPES.comparator,
		datatype,
		operand,
		test,
	})

export default IsUnequalTo
