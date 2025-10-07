import type {
	NumericDatatype,
	Operand,
	SubtractOperator,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Subtract =
	(datatype: NumericDatatype = "Number") =>
	(minuend: Operand) =>
	(subtrahend: Operand): SubtractOperator => ({
		tag: "Subtract",
		type: OPERAND_TYPES.operator,
		minuend,
		subtrahend,
		datatype,
	})

export default Subtract
