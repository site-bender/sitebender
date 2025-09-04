import type { Operand } from "@sitebender/engine-types/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsPrecisionNumber =
	(operand: Operand) => (decimalPlaces: number = 0) => ({
		tag: "IsPrecisionNumber",
		type: OPERAND_TYPES.comparator,
		datatype: "Precision",
		decimalPlaces,
		operand,
	})

export default IsPrecisionNumber
