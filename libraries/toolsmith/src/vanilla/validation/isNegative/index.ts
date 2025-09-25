import and from "../../logic/and/index.ts"
import not from "../../logic/not/index.ts"
import is from "../is/index.ts"
import isFinite from "../isFinite/index.ts"
import isNumber from "../isNumber/index.ts"
import lt from "../lt/index.ts"

export default function isNegative(value: unknown): boolean {
	return and(
		isNumber(value),
	)(
		and(
			isFinite(value),
		)(
			and(
				lt(0)(value),
			)(
				not(is(-0)(value)),
			),
		),
	)
}
