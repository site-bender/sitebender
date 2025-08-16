import type {
	NumericDatatype,
	Operand,
	SineOperator,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Sine = (datatype: NumericDatatype = "Number") =>
(
	operand: Operand,
): SineOperator => ({
	tag: "Sine",
	type: OPERAND_TYPES.operator,
	operand,
	datatype,
})

export default Sine
