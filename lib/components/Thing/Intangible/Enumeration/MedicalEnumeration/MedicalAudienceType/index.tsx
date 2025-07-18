import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MedicalAudienceTypeProps from "../../../../../../types/Thing/MedicalAudienceType/index.ts"
import type MedicalEnumerationProps from "../../../../../../types/Thing/MedicalEnumeration/index.ts"

import MedicalEnumeration from "../index.tsx"

// MedicalAudienceType adds no properties to the MedicalEnumeration schema type
export type Props = BaseComponentProps<
	MedicalAudienceTypeProps,
	"MedicalAudienceType",
	ExtractLevelProps<MedicalAudienceTypeProps, MedicalEnumerationProps>
>

export default function MedicalAudienceType({
	schemaType = "MedicalAudienceType",
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
