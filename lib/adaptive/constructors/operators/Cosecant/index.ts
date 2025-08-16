import type {
	CosecantOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Cosecant =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): CosecantOperator => ({
		tag: "Cosecant",
		type: OPERAND_TYPES.operator,
		operand,
		datatype,
	})

export default Cosecant
