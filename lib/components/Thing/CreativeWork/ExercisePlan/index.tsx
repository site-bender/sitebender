import type BaseProps from "../../../../types/index.ts"
import type ExercisePlanProps from "../../../../types/Thing/CreativeWork/ExercisePlan/index.ts"

import CreativeWork from "../index.tsx"

export type Props = ExercisePlanProps & BaseProps

export default function ExercisePlan({
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
}: Props): JSX.Element {
	return (
		<CreativeWork
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
		>{children}</CreativeWork>
	)
}
