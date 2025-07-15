import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type PriceComponentTypeEnumerationProps from "../../../../../types/Thing/PriceComponentTypeEnumeration/index.ts"

import Enumeration from "./index.tsx"

// PriceComponentTypeEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	PriceComponentTypeEnumerationProps,
	"PriceComponentTypeEnumeration",
	ExtractLevelProps<PriceComponentTypeEnumerationProps, EnumerationProps>
>

export default function PriceComponentTypeEnumeration({
	schemaType = "PriceComponentTypeEnumeration",
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
