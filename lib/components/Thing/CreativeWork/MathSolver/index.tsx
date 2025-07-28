import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { MathSolverProps } from "../../../../types/Thing/CreativeWork/MathSolver/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	MathSolverProps,
	"MathSolver",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function MathSolver({
	mathExpression,
	schemaType = "MathSolver",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				mathExpression,
				...subtypeProperties,
			}}
		/>
	)
}
