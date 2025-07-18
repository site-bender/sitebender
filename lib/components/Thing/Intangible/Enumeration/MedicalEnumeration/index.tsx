import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type MedicalEnumerationProps from "../../../../../types/Thing/MedicalEnumeration/index.ts"

import Enumeration from "../index.tsx"

// MedicalEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	MedicalEnumerationProps,
	"MedicalEnumeration",
	ExtractLevelProps<MedicalEnumerationProps, EnumerationProps>
>

export default function MedicalEnumeration({
	schemaType = "MedicalEnumeration",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Enumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
