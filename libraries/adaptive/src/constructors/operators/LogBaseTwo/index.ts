import type {
	LogBaseTwoOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const LogBaseTwo =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): LogBaseTwoOperator => ({
		tag: "LogBaseTwo",
		type: OPERAND_TYPES.operator,
		operand,
		datatype,
	})

export default LogBaseTwo
