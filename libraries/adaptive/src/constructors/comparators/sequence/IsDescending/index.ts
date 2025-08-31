import type { Operand } from "@adaptiveTypes/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsDescending =
	(datatype: "Array" | "Set" = "Array") => (operand: Operand) => ({
		tag: "IsDescending",
		type: OPERAND_TYPES.comparator,
		datatype,
		operand,
	})

export default IsDescending
