import type {
	AverageOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Average =
	(datatype: NumericDatatype = "Number") =>
	(operands: Array<Operand> = []): AverageOperator => ({
		tag: "Average",
		type: OPERAND_TYPES.operator,
		operands,
		datatype,
	})

export default Average
