import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../../types/index.ts"
import type MedicalTherapyProps from "../../../../../../../types/Thing/MedicalTherapy/index.ts"
import type PhysicalTherapyProps from "../../../../../../../types/Thing/PhysicalTherapy/index.ts"

import MedicalTherapy from "../index.tsx"

// PhysicalTherapy adds no properties to the MedicalTherapy schema type
export type Props = BaseComponentProps<
	PhysicalTherapyProps,
	"PhysicalTherapy",
	ExtractLevelProps<PhysicalTherapyProps, MedicalTherapyProps>
>

export default function PhysicalTherapy({
	schemaType = "PhysicalTherapy",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalTherapy
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
