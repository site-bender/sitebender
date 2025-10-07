import type {
	NumericDatatype,
	Operand,
	ReciprocalOperator,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Reciprocal =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): ReciprocalOperator => ({
		tag: "Reciprocal",
		type: OPERAND_TYPES.operator,
		operand,
		datatype,
	})

export default Reciprocal
