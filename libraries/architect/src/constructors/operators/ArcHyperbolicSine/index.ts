import type {
	ArcHyperbolicSineOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const ArcHyperbolicSine =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): ArcHyperbolicSineOperator => ({
		tag: "ArcHyperbolicSine",
		type: OPERAND_TYPES.operator,
		datatype,
		operand,
	})

export default ArcHyperbolicSine
