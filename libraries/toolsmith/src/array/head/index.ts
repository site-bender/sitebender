import at from "../at/index.ts"

//++ Returns the first element (alias for first)
export default function head<T>(array: Array<T>): T | null {
	return at(0)(array)
}
