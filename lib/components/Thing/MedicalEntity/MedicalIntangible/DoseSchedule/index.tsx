import type BaseProps from "../../../../../types/index.ts"
import type DoseScheduleProps from "../../../../../types/Thing/MedicalEntity/MedicalIntangible/DoseSchedule/index.ts"

import MedicalIntangible from "../index.tsx"

export type Props = DoseScheduleProps & BaseProps

export default function DoseSchedule({
	doseUnit,
	doseValue,
	frequency,
	targetPopulation,
	_type = "DoseSchedule",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalIntangible
			{...props}
			_type={_type}
			subtypeProperties={{
				doseUnit,
				doseValue,
				frequency,
				targetPopulation,
				...subtypeProperties,
			}}
		/>
	)
}
