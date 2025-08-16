import type {
	NumericDatatype,
	Operand,
	RoundOperator,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Round =
	(datatype: NumericDatatype = "Number") =>
	(decimalPlaces: number = 0) =>
	(operand: Operand): RoundOperator => ({
		tag: "Round",
		type: OPERAND_TYPES.operator,
		datatype,
		decimalPlaces,
		operand,
	})

export default Round
