import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type SizeGroupEnumerationProps from "../../../../../types/Thing/SizeGroupEnumeration/index.ts"

import Enumeration from "../index.tsx"

// SizeGroupEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	SizeGroupEnumerationProps,
	"SizeGroupEnumeration",
	ExtractLevelProps<SizeGroupEnumerationProps, EnumerationProps>
>

export default function SizeGroupEnumeration({
	schemaType = "SizeGroupEnumeration",
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
