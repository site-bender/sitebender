import type BaseProps from "../../../../../../types/index.ts"
import type RecommendedDoseScheduleProps from "../../../../../../types/Thing/MedicalEntity/MedicalIntangible/DoseSchedule/RecommendedDoseSchedule/index.ts"

import DoseSchedule from "../index.tsx"

export type Props = RecommendedDoseScheduleProps & BaseProps

export default function RecommendedDoseSchedule({
	_type = "RecommendedDoseSchedule",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<DoseSchedule
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
