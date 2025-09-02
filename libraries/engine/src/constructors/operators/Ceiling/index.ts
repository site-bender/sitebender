import type {
	CeilingOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Ceiling =
	(datatype: NumericDatatype = "Number") =>
	(decimalPlaces: number = 0) =>
	(operand: Operand): CeilingOperator => ({
		tag: "Ceiling",
		type: OPERAND_TYPES.operator,
		datatype,
		decimalPlaces,
		operand,
	})

export default Ceiling
