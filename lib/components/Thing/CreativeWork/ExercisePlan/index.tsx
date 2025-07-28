import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { ExercisePlanProps } from "../../../../types/Thing/CreativeWork/ExercisePlan/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	ExercisePlanProps,
	"ExercisePlan",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function ExercisePlan({
	activityDuration,
	activityFrequency,
	additionalVariable,
	exerciseType,
	intensity,
	repetitions,
	restPeriods,
	workload,
	schemaType = "ExercisePlan",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				activityDuration,
				activityFrequency,
				additionalVariable,
				exerciseType,
				intensity,
				repetitions,
				restPeriods,
				workload,
				...subtypeProperties,
			}}
		/>
	)
}
