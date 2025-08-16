import type {
	MaxOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Max =
	(datatype: NumericDatatype = "Number") =>
	(operands: Array<Operand> = []): MaxOperator => ({
		tag: "Max",
		type: OPERAND_TYPES.operator,
		operands,
		datatype,
	})

export default Max
