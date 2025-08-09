import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Root = (datatype = "Number") => (radicand) => (index) => ({
	tag: "Root",
	type: OPERAND_TYPES.operator,
	radicand,
	index,
	datatype,
})

export default Root
