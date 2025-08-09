import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Add = (datatype = "Number") => (addends = []) => ({
	addends,
	datatype,
	tag: "Add",
	type: OPERAND_TYPES.operator,
})

export default Add
