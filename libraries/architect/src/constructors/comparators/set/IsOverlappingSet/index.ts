import type { Operand } from "@sitebender/architect-types/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsOverlappingSet =
	(datatype: "Set" = "Set") => (operand: Operand) => (test: Operand) => ({
		tag: "IsOverlappingSet",
		type: OPERAND_TYPES.comparator,
		datatype,
		operand,
		test,
	})

export default IsOverlappingSet
