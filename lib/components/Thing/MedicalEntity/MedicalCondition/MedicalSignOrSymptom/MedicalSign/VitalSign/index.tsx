import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../../types/index.ts"
import type MedicalSignProps from "../../../../../../../types/Thing/MedicalSign/index.ts"
import type VitalSignProps from "../../../../../../../types/Thing/VitalSign/index.ts"

import MedicalSign from "../index.tsx"

// VitalSign adds no properties to the MedicalSign schema type
export type Props = BaseComponentProps<
	VitalSignProps,
	"VitalSign",
	ExtractLevelProps<VitalSignProps, MedicalSignProps>
>

export default function VitalSign({
	schemaType = "VitalSign",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalSign
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
