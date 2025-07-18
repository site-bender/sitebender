import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type DoseScheduleProps from "../../../../../../types/Thing/DoseSchedule/index.ts"
import type RecommendedDoseScheduleProps from "../../../../../../types/Thing/RecommendedDoseSchedule/index.ts"

import DoseSchedule from "../index.tsx"

// RecommendedDoseSchedule adds no properties to the DoseSchedule schema type
export type Props = BaseComponentProps<
	RecommendedDoseScheduleProps,
	"RecommendedDoseSchedule",
	ExtractLevelProps<RecommendedDoseScheduleProps, DoseScheduleProps>
>

export default function RecommendedDoseSchedule({
	schemaType = "RecommendedDoseSchedule",
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
