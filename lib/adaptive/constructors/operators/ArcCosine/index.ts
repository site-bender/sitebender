import type {
	ArcCosineOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const ArcCosine =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): ArcCosineOperator => ({
		tag: "ArcCosine",
		type: OPERAND_TYPES.operator,
		datatype,
		operand,
	})

export default ArcCosine
