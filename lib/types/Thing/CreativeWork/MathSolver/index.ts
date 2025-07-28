import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type SolveMathAction from "../../Action/SolveMathAction/index.ts"

import MathSolverComponent from "../../../../../components/Thing/CreativeWork/MathSolver/index.tsx"

export interface MathSolverProps {
	mathExpression?: SolveMathAction | Text
}

type MathSolver =
	& Thing
	& CreativeWorkProps
	& MathSolverProps

export default MathSolver
