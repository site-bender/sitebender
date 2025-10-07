import type {
	NumericDatatype,
	Operand,
	RemainderOperator,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Remainder =
	(datatype: NumericDatatype = "Number") =>
	(dividend: Operand) =>
	(divisor: Operand): RemainderOperator => ({
		tag: "Remainder",
		type: OPERAND_TYPES.operator,
		dividend,
		divisor,
		datatype,
	})

export default Remainder
