import type {
	MaxOperator,
	NumericDatatype,
	Operand,
	StringDatatype,
	TemporalDatatype,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

type MaxDatatype = NumericDatatype | StringDatatype | TemporalDatatype

const Max =
	(datatype: MaxDatatype = "Number") =>
	(operands: Array<Operand> = []): MaxOperator => ({
		tag: "Max",
		type: OPERAND_TYPES.operator,
		operands,
		datatype,
	})

export default Max
