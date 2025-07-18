import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type ReturnFeesEnumerationProps from "../../../../../types/Thing/ReturnFeesEnumeration/index.ts"

import Enumeration from "../index.tsx"

// ReturnFeesEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	ReturnFeesEnumerationProps,
	"ReturnFeesEnumeration",
	ExtractLevelProps<ReturnFeesEnumerationProps, EnumerationProps>
>

export default function ReturnFeesEnumeration({
	schemaType = "ReturnFeesEnumeration",
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
