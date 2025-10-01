import not from "../../logic/not/index.ts"

//++ Checks if a value is an even integer (divisible by 2 with no remainder)
export default function isEven(value: unknown): boolean {
	// Check if it's a number and an integer
	if (typeof value !== "number" || not(Number.isInteger(value))) {
		return false
	}

	// Check if it's finite (not NaN or Infinity)
	if (not(Number.isFinite(value))) {
		return false
	}

	// Check if divisible by 2
	return value % 2 === 0
}
