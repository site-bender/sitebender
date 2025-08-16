import type {
	CotangentOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Cotangent =
	(datatype: NumericDatatype = "Number") =>
	(operand: Operand): CotangentOperator => ({
		tag: "Cotangent",
		type: OPERAND_TYPES.operator,
		operand,
		datatype,
	})

export default Cotangent
