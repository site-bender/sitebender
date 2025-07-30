import type BaseProps from "../../../../../../types/index.ts"
import type MaximumDoseScheduleProps from "../../../../../../types/Thing/MedicalEntity/MedicalIntangible/DoseSchedule/MaximumDoseSchedule/index.ts"

import DoseSchedule from "../index.tsx"

export type Props = MaximumDoseScheduleProps & BaseProps

export default function MaximumDoseSchedule({
	_type = "MaximumDoseSchedule",
	children,
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
		>{children}</DoseSchedule>
	)
}
