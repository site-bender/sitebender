import type {
	NaturalLogOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const NaturalLog =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): NaturalLogOperator => ({
		tag: "NaturalLog",
		type: OPERAND_TYPES.operator,
		operand,
		datatype,
	})

export default NaturalLog
