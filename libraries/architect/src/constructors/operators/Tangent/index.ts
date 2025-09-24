import type {
	NumericDatatype,
	Operand,
	TangentOperator,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Tangent =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): TangentOperator => ({
		tag: "Tangent",
		type: OPERAND_TYPES.operator,
		datatype,
		operand,
	})

export default Tangent
