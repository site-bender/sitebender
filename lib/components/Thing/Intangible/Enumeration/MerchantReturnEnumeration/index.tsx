import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type MerchantReturnEnumerationProps from "../../../../../types/Thing/MerchantReturnEnumeration/index.ts"

import Enumeration from "../index.tsx"

// MerchantReturnEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	MerchantReturnEnumerationProps,
	"MerchantReturnEnumeration",
	ExtractLevelProps<MerchantReturnEnumerationProps, EnumerationProps>
>

export default function MerchantReturnEnumeration({
	schemaType = "MerchantReturnEnumeration",
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
