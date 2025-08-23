import type {
	ModeOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Mode =
	(datatype: NumericDatatype = "Number") =>
	(operands: Array<Operand> = []): ModeOperator => ({
		tag: "Mode",
		type: OPERAND_TYPES.operator,
		operands,
		datatype,
	})

export default Mode
