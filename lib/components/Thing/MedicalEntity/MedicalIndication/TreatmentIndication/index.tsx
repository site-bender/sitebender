import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MedicalIndicationProps from "../../../../../types/Thing/MedicalIndication/index.ts"
import type TreatmentIndicationProps from "../../../../../types/Thing/TreatmentIndication/index.ts"

import MedicalIndication from "../index.tsx"

// TreatmentIndication adds no properties to the MedicalIndication schema type
export type Props = BaseComponentProps<
	TreatmentIndicationProps,
	"TreatmentIndication",
	ExtractLevelProps<TreatmentIndicationProps, MedicalIndicationProps>
>

export default function TreatmentIndication({
	schemaType = "TreatmentIndication",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalIndication
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
