import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type SizeSystemEnumerationProps from "../../../../../types/Thing/SizeSystemEnumeration/index.ts"

import Enumeration from "../index.tsx"

// SizeSystemEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	SizeSystemEnumerationProps,
	"SizeSystemEnumeration",
	ExtractLevelProps<SizeSystemEnumerationProps, EnumerationProps>
>

export default function SizeSystemEnumeration({
	schemaType = "SizeSystemEnumeration",
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
