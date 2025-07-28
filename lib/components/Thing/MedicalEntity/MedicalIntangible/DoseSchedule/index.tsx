import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalIntangibleProps } from "../../../../../types/Thing/MedicalEntity/MedicalIntangible/index.ts"
import type { DoseScheduleProps } from "../../../../../types/Thing/MedicalEntity/MedicalIntangible/DoseSchedule/index.ts"

import MedicalIntangible from "../index.tsx"

export type Props = BaseComponentProps<
	DoseScheduleProps,
	"DoseSchedule",
	ExtractLevelProps<ThingProps, MedicalEntityProps, MedicalIntangibleProps>
>

export default function DoseSchedule({
	doseUnit,
	doseValue,
	frequency,
	targetPopulation,
	schemaType = "DoseSchedule",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalIntangible
			{...props}
			schemaType={schemaType}
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
