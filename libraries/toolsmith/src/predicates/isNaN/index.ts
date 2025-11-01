//++ Type guard that checks if a value is the special NaN (Not-a-Number) value using Number.isNaN
export default function isNaN(value: unknown): value is number {
	//++ [EXCEPTION] Number.isNaN permitted in Toolsmith for performance - provides type predicate wrapper
	return Number.isNaN(value)
}
