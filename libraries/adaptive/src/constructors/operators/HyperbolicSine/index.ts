import type {
	HyperbolicSineOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const HyperbolicSine =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): HyperbolicSineOperator => ({
		tag: "HyperbolicSine",
		type: OPERAND_TYPES.operator,
		operand,
		datatype,
	})

export default HyperbolicSine
