import type {
	HypotenuseOperator,
	NumericDatatype,
	Operand,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const Hypotenuse =
	(datatype: NumericDatatype = "Number") =>
	(operands: Array<Operand> = []): HypotenuseOperator => ({
		tag: "Hypotenuse",
		type: OPERAND_TYPES.operator,
		operands,
		datatype,
	})

export default Hypotenuse
