import type {
	MedianOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Median =
	(datatype: NumericDatatype = "Number") =>
	(operands: Array<Operand> = []): MedianOperator => ({
		tag: "Median",
		type: OPERAND_TYPES.operator,
		operands,
		datatype,
	})

export default Median
