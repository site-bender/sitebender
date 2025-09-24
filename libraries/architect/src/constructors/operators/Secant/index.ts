import type {
	NumericDatatype,
	Operand,
	SecantOperator,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Secant =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): SecantOperator => ({
		tag: "Secant",
		type: OPERAND_TYPES.operator,
		operand,
		datatype,
	})

export default Secant
