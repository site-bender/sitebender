import type {
	NumericDatatype,
	Operand,
	ProportionedRateOperator,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const ProportionedRate =
	(datatype: NumericDatatype = "Number") =>
	(table: Operand) =>
	(amount: Operand): ProportionedRateOperator => ({
		tag: "ProportionedRate",
		type: OPERAND_TYPES.operator,
		amount,
		datatype,
		table,
	})

export default ProportionedRate
