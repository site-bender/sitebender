//++ Type guard that checks if a value is a finite number (not Infinity, -Infinity, or NaN)
export default function isFinite(value: unknown): value is number {
	return Number.isFinite(value)
}
