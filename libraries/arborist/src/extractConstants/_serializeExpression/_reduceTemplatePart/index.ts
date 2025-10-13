import _serializeExpression from "../index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

export default function _reduceTemplatePart(expressions: Array<unknown>) {
	return function(acc: string, quasi: Record<string, unknown>, i: number): string {
		const cooked = (quasi.cooked as string) ?? ""
		acc += cooked
		if (i < getOrElse(0)(length(expressions))) {
			acc += "${" + (_serializeExpression(expressions[i]) ?? "") + "}"
		}
		return acc
	}
}
