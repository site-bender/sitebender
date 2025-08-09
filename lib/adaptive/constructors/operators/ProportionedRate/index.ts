import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const ProportionedRate = (datatype = "Number") => (table) => (amount) => ({
	tag: "ProportionedRate",
	type: OPERAND_TYPES.operator,
	amount,
	datatype,
	table,
})

export default ProportionedRate
