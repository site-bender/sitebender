import type BaseProps from "../../../../../../types/index.ts"
import type ExercisePlanProps from "../../../../../../types/Thing/MedicalEntity/LifestyleModification/PhysicalActivity/ExercisePlan/index.ts"

import PhysicalActivity from "../index.tsx"

// ExercisePlan adds no properties to the ListItem schema type
export type Props = ExercisePlanProps & BaseProps

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
		children,
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
		>
			{children}
		</PhysicalActivity>
	)
}
