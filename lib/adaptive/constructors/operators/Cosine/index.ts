import type {
	CosineOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Cosine =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): CosineOperator => ({
		tag: "Cosine",
		type: OPERAND_TYPES.operator,
		operand,
		datatype,
	})

export default Cosine
