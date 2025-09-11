import type {
	ComparatorConfig,
	InjectorConfig,
	OperatorConfig,
} from "../../../engine/types/index.ts"
// Result type for error handling - using toolkit Result
import type { Result } from "../../../toolkit/src/types/fp/result/index.ts"

export type { Result }

// Main function signature
export type ParseFormulaResult = Result<
	OperatorConfig | InjectorConfig | ComparatorConfig,
	ParseError
>
