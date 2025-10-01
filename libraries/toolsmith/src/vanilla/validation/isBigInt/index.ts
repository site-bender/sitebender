//++ Type guard that checks if a value is a bigint primitive
export default function isBigInt(value: unknown): value is bigint {
	return typeof value === "bigint"
}
