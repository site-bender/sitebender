import type {
	MinOperator,
	NumericDatatype,
	StringDatatype,
	TemporalDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

type MinDatatype = NumericDatatype | StringDatatype | TemporalDatatype

const Min =
	(datatype: MinDatatype = "Number") =>
	(operands: Array<Operand> = []): MinOperator => ({
		tag: "Min",
		type: OPERAND_TYPES.operator,
		operands,
		datatype,
	})

export default Min
