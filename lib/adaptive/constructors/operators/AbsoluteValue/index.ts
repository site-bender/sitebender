import type {
	AbsoluteValueOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const AbsoluteValue =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): AbsoluteValueOperator => ({
		tag: "AbsoluteValue",
		type: OPERAND_TYPES.operator,
		datatype,
		operand,
	})

export default AbsoluteValue
