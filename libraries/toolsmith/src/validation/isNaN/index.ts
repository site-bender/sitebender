//++ Type guard that checks if a value is the special NaN (Not-a-Number) value using Number.isNaN
export default function isNaN(value: unknown): value is number {
	return Number.isNaN(value)
}
