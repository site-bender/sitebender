import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
} from "@sitebender/architect-types/index.ts"

import composeComparators from "../composeComparators/index.ts"

const composeValidator = (
	op: ComparatorConfig | LogicalConfig | Operand,
) => composeComparators(op)

export default composeValidator
