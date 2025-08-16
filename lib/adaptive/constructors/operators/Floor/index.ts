import type {
	FloorOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Floor =
	(datatype: NumericDatatype = "Number") =>
	(decimalPlaces: number = 0) =>
	(operand: Operand): FloorOperator => ({
		tag: "Floor",
		type: OPERAND_TYPES.operator,
		datatype,
		decimalPlaces,
		operand,
	})

export default Floor
