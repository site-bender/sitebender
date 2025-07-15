import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MedicalEnumerationProps from "../../../../../../types/Thing/MedicalEnumeration/index.ts"
import type MedicalImagingTechniqueProps from "../../../../../../types/Thing/MedicalImagingTechnique/index.ts"

import MedicalEnumeration from "./index.tsx"

// MedicalImagingTechnique adds no properties to the MedicalEnumeration schema type
export type Props = BaseComponentProps<
	MedicalImagingTechniqueProps,
	"MedicalImagingTechnique",
	ExtractLevelProps<MedicalImagingTechniqueProps, MedicalEnumerationProps>
>

export default function MedicalImagingTechnique({
	schemaType = "MedicalImagingTechnique",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalEnumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
