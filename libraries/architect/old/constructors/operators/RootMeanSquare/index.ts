import type {
	NumericDatatype,
	Operand,
	RootMeanSquareOperator,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const RootMeanSquare =
	(datatype: NumericDatatype = "Number") =>
	(operands: Array<Operand> = []): RootMeanSquareOperator => ({
		tag: "RootMeanSquare",
		type: OPERAND_TYPES.operator,
		operands,
		datatype,
	})

export default RootMeanSquare
