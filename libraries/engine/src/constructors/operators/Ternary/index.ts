import type {
	Datatype,
	Operand,
	TernaryOperator,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Ternary =
	(datatype: Datatype = "Number") =>
	(condition: Operand, ifTrue: Operand, ifFalse: Operand): TernaryOperator => ({
		tag: "Ternary",
		type: OPERAND_TYPES.operator,
		datatype,
		condition,
		ifTrue,
		ifFalse,
	})

export default Ternary
