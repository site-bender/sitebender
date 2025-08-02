import type BaseProps from "../../../../types/index.ts"
import type MathSolverProps from "../../../../types/Thing/CreativeWork/MathSolver/index.ts"

import CreativeWork from "../index.tsx"

export type Props = MathSolverProps & BaseProps

export default function MathSolver({
	mathExpression,
	_type = "MathSolver",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				mathExpression,
				...subtypeProperties,
			}}
		>
			{children}
		</CreativeWork>
	)
}
