import type {
	MeanOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Mean =
	(datatype: NumericDatatype = "Number") =>
	(operands: Array<Operand> = []): MeanOperator => ({
		tag: "Mean",
		type: OPERAND_TYPES.operator,
		operands,
		datatype,
	})

export default Mean
