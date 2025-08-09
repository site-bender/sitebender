import isInteger from "../../guards/isInteger/index.ts"

export default function isTabIndex(value: unknown): value is string | number {
	if (typeof value === "string") {
		return isInteger(value) && parseInt(value, 10) > -2
	}
	return isInteger(value) && (value as number) > -2
}
