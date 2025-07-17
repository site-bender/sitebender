import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"
import type ShoppingCenterProps from "../../../../../types/Thing/ShoppingCenter/index.ts"

import LocalBusiness from "../index.tsx"

// ShoppingCenter adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	ShoppingCenterProps,
	"ShoppingCenter",
	ExtractLevelProps<ShoppingCenterProps, LocalBusinessProps>
>

export default function ShoppingCenter({
	schemaType = "ShoppingCenter",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<LocalBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
