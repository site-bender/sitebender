import not from "../../logic/not/index.ts"

//++ Type guard that checks if a value is a JavaScript number primitive (excludes NaN)
export default function isNumber(value: unknown): value is number {
	return typeof value === "number" && not(Number.isNaN(value))
}
