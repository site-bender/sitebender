import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MedicalDevicePurposeProps from "../../../../../../types/Thing/MedicalDevicePurpose/index.ts"
import type MedicalEnumerationProps from "../../../../../../types/Thing/MedicalEnumeration/index.ts"

import MedicalEnumeration from "./index.tsx"

// MedicalDevicePurpose adds no properties to the MedicalEnumeration schema type
export type Props = BaseComponentProps<
	MedicalDevicePurposeProps,
	"MedicalDevicePurpose",
	ExtractLevelProps<MedicalDevicePurposeProps, MedicalEnumerationProps>
>

export default function MedicalDevicePurpose({
	schemaType = "MedicalDevicePurpose",
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
