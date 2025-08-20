import type { ConditionalOperation } from "../conditionals/index.ts"
import type { AllowedNumericOperands } from "../operators/index.ts"

import { OPERATION_TAGS } from "../../../constructors/constants/index.ts"

export interface TernaryOperation {
	_tag: typeof OPERATION_TAGS.ternary
	condition: ConditionalOperation
	onTrue: AllowedNumericOperands
	onFalse: AllowedNumericOperands
}
