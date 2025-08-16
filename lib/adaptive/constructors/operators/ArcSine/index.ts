import type {
	ArcSineOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const ArcSine =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): ArcSineOperator => ({
		tag: "ArcSine",
		type: OPERAND_TYPES.operator,
		datatype,
		operand,
	})

export default ArcSine
