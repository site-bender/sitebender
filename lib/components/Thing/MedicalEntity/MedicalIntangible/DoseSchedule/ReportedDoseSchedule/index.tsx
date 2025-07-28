import type BaseProps from "../../../../../../types/index.ts"
import type { ReportedDoseScheduleProps } from "../../../../../../types/Thing/MedicalEntity/MedicalIntangible/DoseSchedule/ReportedDoseSchedule/index.ts"

import DoseSchedule from "../index.tsx"

export type Props = ReportedDoseScheduleProps & BaseProps

export default function ReportedDoseSchedule({
	_type = "ReportedDoseSchedule",
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
