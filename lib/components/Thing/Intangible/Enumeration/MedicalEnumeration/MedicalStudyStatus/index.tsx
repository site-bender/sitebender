import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MedicalEnumerationProps from "../../../../../../types/Thing/MedicalEnumeration/index.ts"
import type MedicalStudyStatusProps from "../../../../../../types/Thing/MedicalStudyStatus/index.ts"

import MedicalEnumeration from "./index.tsx"

// MedicalStudyStatus adds no properties to the MedicalEnumeration schema type
export type Props = BaseComponentProps<
	MedicalStudyStatusProps,
	"MedicalStudyStatus",
	ExtractLevelProps<MedicalStudyStatusProps, MedicalEnumerationProps>
>

export default function MedicalStudyStatus({
	schemaType = "MedicalStudyStatus",
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
