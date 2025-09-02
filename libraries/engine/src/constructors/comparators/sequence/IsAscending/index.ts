import type { Operand } from "@engineTypes/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsAscending =
	(datatype: "Array" | "Set" = "Array") => (operand: Operand) => ({
		tag: "IsAscending",
		type: OPERAND_TYPES.comparator,
		datatype,
		operand,
	})

export default IsAscending
