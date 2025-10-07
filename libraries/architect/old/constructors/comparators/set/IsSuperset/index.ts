import type { Operand } from "@sitebender/architect-types/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsSuperset =
	(datatype: "Set" = "Set") => (operand: Operand) => (test: Operand) => ({
		tag: "IsSuperset",
		type: OPERAND_TYPES.comparator,
		datatype,
		operand,
		test,
	})

export default IsSuperset
