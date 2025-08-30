import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

const IsPrecisionNumber = (operand: Operand) => (decimalPlaces: number = 0) => ({
	tag: "IsPrecisionNumber",
	type: OPERAND_TYPES.comparator,
	datatype: "Precision",
	decimalPlaces,
	operand,
})

export default IsPrecisionNumber
