import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type PurchaseTypeProps from "../../../../../types/Thing/PurchaseType/index.ts"

import Enumeration from "../index.tsx"

// PurchaseType adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	PurchaseTypeProps,
	"PurchaseType",
	ExtractLevelProps<PurchaseTypeProps, EnumerationProps>
>

export default function PurchaseType({
	schemaType = "PurchaseType",
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
