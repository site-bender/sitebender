import type {
	NumericDatatype,
	Operand,
	RootOperator,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Root =
	(datatype: NumericDatatype = "Number") =>
	(radicand: Operand) =>
	(index: Operand): RootOperator => ({
		tag: "Root",
		type: OPERAND_TYPES.operator,
		radicand,
		index,
		datatype,
	})

export default Root
