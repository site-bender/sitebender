import type { Text } from "../../../DataType/index.ts"
import type SolveMathAction from "../../Action/SolveMathAction/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import SolveMathActionComponent from "../../../../components/Thing/Action/SolveMathAction/index.ts"

export interface MathSolverProps {
	"@type"?: "MathSolver"
	mathExpression?:
		| SolveMathAction
		| Text
		| ReturnType<typeof SolveMathActionComponent>
}

type MathSolver = Thing & CreativeWorkProps & MathSolverProps

export default MathSolver
