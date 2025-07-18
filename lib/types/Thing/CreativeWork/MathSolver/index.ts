import type { Text } from "../../../DataType/index.ts"
import type SolveMathAction from "../../Action/SolveMathAction/index.ts"
import type CreativeWork from "../index.ts"

export default interface MathSolver extends CreativeWork {
	/** A mathematical expression (e.g. 'x^2-3x=0') that may be solved for a specific variable, simplified, or transformed. This can take many formats, e.g. LaTeX, Ascii-Math, or math as you would write with a keyboard. */
	mathExpression?: SolveMathAction | Text
}
