import type {
	ExponentOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Exponent =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): ExponentOperator => ({
		tag: "Exponent",
		type: OPERAND_TYPES.operator,
		operand,
		datatype,
	})

export default Exponent
