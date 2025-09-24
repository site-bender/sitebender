import type {
	ArcHyperbolicTangentOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const ArcHyperbolicTangent =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): ArcHyperbolicTangentOperator => ({
		tag: "ArcHyperbolicTangent",
		type: OPERAND_TYPES.operator,
		datatype,
		operand,
	})

export default ArcHyperbolicTangent
