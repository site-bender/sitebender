import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MedicalEnumerationProps from "../../../../../../types/Thing/MedicalEnumeration/index.ts"
import type MedicalEvidenceLevelProps from "../../../../../../types/Thing/MedicalEvidenceLevel/index.ts"

import MedicalEnumeration from "./index.tsx"

// MedicalEvidenceLevel adds no properties to the MedicalEnumeration schema type
export type Props = BaseComponentProps<
	MedicalEvidenceLevelProps,
	"MedicalEvidenceLevel",
	ExtractLevelProps<MedicalEvidenceLevelProps, MedicalEnumerationProps>
>

export default function MedicalEvidenceLevel({
	schemaType = "MedicalEvidenceLevel",
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
