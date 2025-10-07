import type {
	ArcHyperbolicCosineOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const ArcHyperbolicCosine =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): ArcHyperbolicCosineOperator => ({
		tag: "ArcHyperbolicCosine",
		type: OPERAND_TYPES.operator,
		datatype,
		operand,
	})

export default ArcHyperbolicCosine
