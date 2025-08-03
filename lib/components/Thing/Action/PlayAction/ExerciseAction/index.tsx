import type BaseProps from "../../../../../types/index.ts"
import type { ExerciseAction as ExerciseActionProps } from "../../../../../types/index.ts"

import PlayAction from "../index.tsx"

export type Props = ExerciseActionProps & BaseProps

export default function ExerciseAction({
	_type = "ExerciseAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
