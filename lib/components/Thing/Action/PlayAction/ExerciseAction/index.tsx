import type BaseProps from "../../../../../types/index.ts"
import type { ExerciseActionProps } from "../../../../../types/Thing/Action/PlayAction/ExerciseAction/index.ts"

import PlayAction from "../index.tsx"

export type Props = ExerciseActionProps & BaseProps

export default function ExerciseAction({
	course,
	diet,
	distance,
	exerciseCourse,
	exercisePlan,
	exerciseRelatedDiet,
	exerciseType,
	fromLocation,
	opponent,
	sportsActivityLocation,
	sportsEvent,
	sportsTeam,
	toLocation,
	_type = "ExerciseAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PlayAction
			{...props}
			_type={_type}
			subtypeProperties={{
				course,
				diet,
				distance,
				exerciseCourse,
				exercisePlan,
				exerciseRelatedDiet,
				exerciseType,
				fromLocation,
				opponent,
				sportsActivityLocation,
				sportsEvent,
				sportsTeam,
				toLocation,
				...subtypeProperties,
			}}
		/>
	)
}
