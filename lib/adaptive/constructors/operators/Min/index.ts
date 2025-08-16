import type {
	MinOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Min =
	(datatype: NumericDatatype = "Number") =>
	(operands: Array<Operand> = []): MinOperator => ({
		tag: "Min",
		type: OPERAND_TYPES.operator,
		operands,
		datatype,
	})

export default Min
