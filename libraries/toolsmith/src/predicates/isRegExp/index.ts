//++ Type guard that checks if a value is a RegExp object
export default function isRegExp(value: unknown): value is RegExp {
	//++ [EXCEPTION] instanceof permitted in Toolsmith for performance - provides type predicate wrapper
	return value instanceof RegExp
}
