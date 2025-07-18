import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type ReturnMethodEnumerationProps from "../../../../../types/Thing/ReturnMethodEnumeration/index.ts"

import Enumeration from "../index.tsx"

// ReturnMethodEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	ReturnMethodEnumerationProps,
	"ReturnMethodEnumeration",
	ExtractLevelProps<ReturnMethodEnumerationProps, EnumerationProps>
>

export default function ReturnMethodEnumeration({
	schemaType = "ReturnMethodEnumeration",
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
