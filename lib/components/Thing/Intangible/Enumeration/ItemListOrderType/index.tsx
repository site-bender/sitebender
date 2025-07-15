import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type ItemListOrderTypeProps from "../../../../../types/Thing/ItemListOrderType/index.ts"

import Enumeration from "./index.tsx"

// ItemListOrderType adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	ItemListOrderTypeProps,
	"ItemListOrderType",
	ExtractLevelProps<ItemListOrderTypeProps, EnumerationProps>
>

export default function ItemListOrderType({
	schemaType = "ItemListOrderType",
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
