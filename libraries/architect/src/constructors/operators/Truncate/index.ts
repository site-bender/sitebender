import type {
	NumericDatatype,
	Operand,
	TruncateOperator,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Truncate =
	(datatype: NumericDatatype = "Number") =>
	(_decimalPlaces: number = 0) =>
	(operand: Operand): TruncateOperator => ({
		tag: "Truncate",
		type: OPERAND_TYPES.operator,
		datatype,
		operand,
	})

export default Truncate
