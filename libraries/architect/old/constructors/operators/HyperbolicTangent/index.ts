import type {
	HyperbolicTangentOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const HyperbolicTangent =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): HyperbolicTangentOperator => ({
		tag: "HyperbolicTangent",
		type: OPERAND_TYPES.operator,
		operand,
		datatype,
	})

export default HyperbolicTangent
