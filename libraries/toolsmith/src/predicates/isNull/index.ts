//++ Type guard that checks if a value is strictly null (not undefined or falsy)
export default function isNull(value: unknown): value is null {
	//++ [EXCEPTION] === permitted in Toolsmith for performance - provides type predicate wrapper
	return value === null
}
