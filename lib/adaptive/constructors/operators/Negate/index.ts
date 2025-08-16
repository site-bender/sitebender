import type {
	NegateOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Negate =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): NegateOperator => ({
		tag: "Negate",
		type: OPERAND_TYPES.operator,
		operand,
		datatype,
	})

export default Negate
