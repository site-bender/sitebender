import type {
	NumericDatatype,
	Operand,
	PowerOperator,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Power =
	(datatype: NumericDatatype = "Number") =>
	(base: Operand) =>
	(exponent: Operand): PowerOperator => ({
		tag: "Power",
		type: OPERAND_TYPES.operator,
		base,
		exponent,
		datatype,
	})

export default Power
