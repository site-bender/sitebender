import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../../types/index.ts"
import type MedicalTherapyProps from "../../../../../../../types/Thing/MedicalTherapy/index.ts"
import type RadiationTherapyProps from "../../../../../../../types/Thing/RadiationTherapy/index.ts"

import MedicalTherapy from "./index.tsx"

// RadiationTherapy adds no properties to the MedicalTherapy schema type
export type Props = BaseComponentProps<
	RadiationTherapyProps,
	"RadiationTherapy",
	ExtractLevelProps<RadiationTherapyProps, MedicalTherapyProps>
>

export default function RadiationTherapy({
	schemaType = "RadiationTherapy",
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
