import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type ExercisePlanProps from "../../../../../../types/Thing/ExercisePlan/index.ts"
import type PhysicalActivityProps from "../../../../../../types/Thing/PhysicalActivity/index.ts"

import PhysicalActivity from "../index.tsx"

export type Props = BaseComponentProps<
	ExercisePlanProps,
	"ExercisePlan",
	ExtractLevelProps<ExercisePlanProps, PhysicalActivityProps>
>

export default function ExercisePlan(
	{
		activityDuration,
		activityFrequency,
		additionalVariable,
		exerciseType,
		intensity,
		repetitions,
		restPeriods,
		workload,
		_type = "ExercisePlan",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<PhysicalActivity
			{...props}
			_type={_type}
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
