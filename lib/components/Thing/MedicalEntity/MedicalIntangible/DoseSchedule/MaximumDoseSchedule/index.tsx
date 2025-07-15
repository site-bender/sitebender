import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type DoseScheduleProps from "../../../../../../types/Thing/DoseSchedule/index.ts"
import type MaximumDoseScheduleProps from "../../../../../../types/Thing/MaximumDoseSchedule/index.ts"

import DoseSchedule from "./index.tsx"

// MaximumDoseSchedule adds no properties to the DoseSchedule schema type
export type Props = BaseComponentProps<
	MaximumDoseScheduleProps,
	"MaximumDoseSchedule",
	ExtractLevelProps<MaximumDoseScheduleProps, DoseScheduleProps>
>

export default function MaximumDoseSchedule({
	schemaType = "MaximumDoseSchedule",
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
