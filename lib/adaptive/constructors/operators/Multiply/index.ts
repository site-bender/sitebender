import type {
	MultiplyOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Multiply =
	(datatype: NumericDatatype = "Number") =>
	(multipliers: Array<Operand> = []): MultiplyOperator => ({
		tag: "Multiply",
		type: OPERAND_TYPES.operator,
		multipliers,
		datatype,
	})

export default Multiply
