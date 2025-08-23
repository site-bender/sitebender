import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Ternary = (condition, ifTrue, ifFalse) => ({
	tag: "Ternary",
	type: OPERAND_TYPES.operator,
	condition,
	ifTrue,
	ifFalse,
})

export default Ternary
