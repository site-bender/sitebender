import type BaseProps from "../../../../types/index.ts"
import type { MathSolver as MathSolverProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = MathSolverProps & BaseProps

export default function MathSolver({
	_type = "MathSolver",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
