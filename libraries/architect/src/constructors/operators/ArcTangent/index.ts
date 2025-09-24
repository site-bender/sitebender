import type {
	ArcTangentOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const ArcTangent =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): ArcTangentOperator => ({
		tag: "ArcTangent",
		type: OPERAND_TYPES.operator,
		datatype,
		operand,
	})

export default ArcTangent
