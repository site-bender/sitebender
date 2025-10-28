import type BaseProps from "../../../../../../../types/index.ts"
import type { ExercisePlan as ExercisePlanProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

// ExercisePlan adds no properties to the ListItem schema type
export type Props = ExercisePlanProps & BaseProps

export default function ExercisePlan({
	_type = "ExercisePlan",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
