import type BaseProps from "../../../../../../types/index.ts"
import type { ExerciseGym as ExerciseGymProps } from "../../../../../../types/index.ts"

import SportsActivityLocation from "../index.tsx"

export type Props = ExerciseGymProps & BaseProps

export default function ExerciseGym({
	_type = "ExerciseGym",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
