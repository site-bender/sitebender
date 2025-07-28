import type BaseProps from "../../../../../../types/index.ts"
import type { ExerciseGymProps } from "../../../../../../types/Thing/Organization/LocalBusiness/SportsActivityLocation/ExerciseGym/index.ts"

import SportsActivityLocation from "../index.tsx"

export type Props = ExerciseGymProps & BaseProps

export default function ExerciseGym({
	_type = "ExerciseGym",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<SportsActivityLocation
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
