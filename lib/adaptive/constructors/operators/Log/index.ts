import type {
	LogOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Log = (datatype: NumericDatatype = "Number") =>
(
	operand: Operand,
): LogOperator => ({
	tag: "Log",
	type: OPERAND_TYPES.operator,
	operand,
	datatype,
})

export default Log
