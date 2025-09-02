import type {
	BooleanDatatype,
	ComparatorConfig,
	LogicalConfig,
} from "../../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constants/index.ts"

const And =
	(datatype: BooleanDatatype = "Boolean") =>
	(operands: Array<ComparatorConfig | LogicalConfig> = []): LogicalConfig => ({
		tag: "And",
		type: OPERAND_TYPES.logical,
		datatype,
		operands,
	})

export default And
