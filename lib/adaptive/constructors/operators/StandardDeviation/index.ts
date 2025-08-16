import type {
	NumericDatatype,
	Operand,
	StandardDeviationOperator,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"

const StandardDeviation =
	(datatype = "Number") => (usePopulation = false) => (operands = []) => ({
		tag: "StandardDeviation",
		type: OPERAND_TYPES.operator,
		operands,
		datatype,
		usePopulation,
	})

export default StandardDeviation
