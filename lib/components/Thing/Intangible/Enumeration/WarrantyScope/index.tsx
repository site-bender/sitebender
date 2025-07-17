import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type WarrantyScopeProps from "../../../../../types/Thing/WarrantyScope/index.ts"

import Enumeration from "../index.tsx"

// WarrantyScope adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	WarrantyScopeProps,
	"WarrantyScope",
	ExtractLevelProps<WarrantyScopeProps, EnumerationProps>
>

export default function WarrantyScope({
	schemaType = "WarrantyScope",
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
