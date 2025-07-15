import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MedicalEnumerationProps from "../../../../../../types/Thing/MedicalEnumeration/index.ts"
import type MedicalObservationalStudyDesignProps from "../../../../../../types/Thing/MedicalObservationalStudyDesign/index.ts"

import MedicalEnumeration from "./index.tsx"

// MedicalObservationalStudyDesign adds no properties to the MedicalEnumeration schema type
export type Props = BaseComponentProps<
	MedicalObservationalStudyDesignProps,
	"MedicalObservationalStudyDesign",
	ExtractLevelProps<
		MedicalObservationalStudyDesignProps,
		MedicalEnumerationProps
	>
>

export default function MedicalObservationalStudyDesign({
	schemaType = "MedicalObservationalStudyDesign",
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
