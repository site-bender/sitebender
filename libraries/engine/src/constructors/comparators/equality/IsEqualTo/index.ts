import type { Datatype, Operand } from "@sitebender/engine-types/index.ts"

import { OPERAND_TYPES } from "@sitebender/engine/constructors/constants/index.ts"

const IsEqualTo =
	(datatype: Datatype = "String") => (operand: Operand) => (test: Operand) => ({
		tag: "IsEqualTo" as const,
		type: OPERAND_TYPES.comparator,
		datatype,
		operand,
		test,
	})

export default IsEqualTo
