import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type FulfillmentTypeEnumerationProps from "../../../../../types/Thing/FulfillmentTypeEnumeration/index.ts"

import Enumeration from "../index.tsx"

// FulfillmentTypeEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	FulfillmentTypeEnumerationProps,
	"FulfillmentTypeEnumeration",
	ExtractLevelProps<FulfillmentTypeEnumerationProps, EnumerationProps>
>

export default function FulfillmentTypeEnumeration({
	schemaType = "FulfillmentTypeEnumeration",
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
