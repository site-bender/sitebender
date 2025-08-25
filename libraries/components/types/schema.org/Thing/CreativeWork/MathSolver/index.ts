import type { Text } from "../../../DataType/index.ts"
import type SolveMathAction from "../../Action/SolveMathAction/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import { SolveMathAction as SolveMathActionComponent } from "../../../../../components/index.tsx"

export type MathSolverType = "MathSolver"

export interface MathSolverProps {
	"@type"?: MathSolverType
	mathExpression?:
		| SolveMathAction
		| Text
		| ReturnType<typeof SolveMathActionComponent>
}

type MathSolver = Thing & CreativeWorkProps & MathSolverProps

export default MathSolver
