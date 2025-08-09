import { MATCHERS } from "../../guards/constants/index.ts"

export default function isInteger(value: unknown): value is number {
	return MATCHERS.integer.test(String(value))
}
