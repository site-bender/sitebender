import type {
	HyperbolicCosineOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const HyperbolicCosine =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): HyperbolicCosineOperator => ({
		tag: "HyperbolicCosine",
		type: OPERAND_TYPES.operator,
		operand,
		datatype,
	})

export default HyperbolicCosine
