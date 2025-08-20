import type {
	ModuloOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Modulo =
	(datatype: NumericDatatype = "Number") =>
	(dividend: Operand) =>
	(divisor: Operand): ModuloOperator => ({
		tag: "Modulo",
		type: OPERAND_TYPES.operator,
		dividend,
		divisor,
		datatype,
	})

export default Modulo
