import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { PlayActionProps } from "../../../../../types/Thing/Action/PlayAction/index.ts"
import type { ExerciseActionProps } from "../../../../../types/Thing/Action/PlayAction/ExerciseAction/index.ts"

import PlayAction from "../index.tsx"

export type Props = BaseComponentProps<
	ExerciseActionProps,
	"ExerciseAction",
	ExtractLevelProps<ThingProps, ActionProps, PlayActionProps>
>

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
	schemaType = "ExerciseAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<PlayAction
			{...props}
			schemaType={schemaType}
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
