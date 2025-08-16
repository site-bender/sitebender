import type {
	ComparatorConfig,
	Datatype,
	LogicalConfig,
} from "../../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constants/index.ts"

const And =
	(datatype: Datatype = "Boolean") =>
	(operands: Array<ComparatorConfig | LogicalConfig> = []): LogicalConfig => ({
		tag: "And",
		type: OPERAND_TYPES.logical,
		datatype,
		operands,
	})

export default And
