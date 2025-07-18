import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DoseScheduleProps from "../../../../../types/Thing/DoseSchedule/index.ts"
import type MedicalIntangibleProps from "../../../../../types/Thing/MedicalIntangible/index.ts"

import MedicalIntangible from "../index.tsx"

export type Props = BaseComponentProps<
	DoseScheduleProps,
	"DoseSchedule",
	ExtractLevelProps<DoseScheduleProps, MedicalIntangibleProps>
>

export default function DoseSchedule(
	{
		doseUnit,
		doseValue,
		frequency,
		targetPopulation,
		schemaType = "DoseSchedule",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
