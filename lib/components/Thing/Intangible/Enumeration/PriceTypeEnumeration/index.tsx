import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type PriceTypeEnumerationProps from "../../../../../types/Thing/PriceTypeEnumeration/index.ts"

import Enumeration from "../index.tsx"

// PriceTypeEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	PriceTypeEnumerationProps,
	"PriceTypeEnumeration",
	ExtractLevelProps<PriceTypeEnumerationProps, EnumerationProps>
>

export default function PriceTypeEnumeration({
	schemaType = "PriceTypeEnumeration",
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
