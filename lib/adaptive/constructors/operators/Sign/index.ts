import type {
	NumericDatatype,
	Operand,
	SignOperator,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Sign = (datatype: NumericDatatype = "Number") =>
(
	operand: Operand,
): SignOperator => ({
	tag: "Sign",
	type: OPERAND_TYPES.operator,
	operand,
	datatype,
})

export default Sign
