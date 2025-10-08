//++ Type guard that checks if a value is a RegExp object
export default function isRegExp(value: unknown): value is RegExp {
	return value instanceof RegExp
}
