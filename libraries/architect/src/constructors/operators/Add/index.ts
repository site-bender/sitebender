import type {
	AddOperator,
	NumericDatatype,
	Operand,
	StringDatatype,
	TemporalDatatype,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

type AddDatatype = NumericDatatype | StringDatatype | TemporalDatatype

const Add =
	(datatype: AddDatatype = "Number") =>
	(addends: Array<Operand> = []): AddOperator => ({
		addends,
		datatype,
		tag: "Add",
		type: OPERAND_TYPES.operator,
	})

export default Add
