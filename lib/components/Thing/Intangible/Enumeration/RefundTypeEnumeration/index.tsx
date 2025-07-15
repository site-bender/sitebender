import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type RefundTypeEnumerationProps from "../../../../../types/Thing/RefundTypeEnumeration/index.ts"

import Enumeration from "./index.tsx"

// RefundTypeEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	RefundTypeEnumerationProps,
	"RefundTypeEnumeration",
	ExtractLevelProps<RefundTypeEnumerationProps, EnumerationProps>
>

export default function RefundTypeEnumeration({
	schemaType = "RefundTypeEnumeration",
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
