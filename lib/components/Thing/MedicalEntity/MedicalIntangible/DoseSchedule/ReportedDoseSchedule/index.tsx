import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type DoseScheduleProps from "../../../../../../types/Thing/DoseSchedule/index.ts"
import type ReportedDoseScheduleProps from "../../../../../../types/Thing/ReportedDoseSchedule/index.ts"

import DoseSchedule from "../index.tsx"

// ReportedDoseSchedule adds no properties to the DoseSchedule schema type
export type Props = BaseComponentProps<
	ReportedDoseScheduleProps,
	"ReportedDoseSchedule",
	ExtractLevelProps<ReportedDoseScheduleProps, DoseScheduleProps>
>

export default function ReportedDoseSchedule({
	schemaType = "ReportedDoseSchedule",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<DoseSchedule
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
