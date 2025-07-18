import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BreadcrumbListProps from "../../../../../types/Thing/BreadcrumbList/index.ts"
import type ItemListProps from "../../../../../types/Thing/ItemList/index.ts"

import ItemList from "../index.tsx"

// BreadcrumbList adds no properties to the ItemList schema type
export type Props = BaseComponentProps<
	BreadcrumbListProps,
	"BreadcrumbList",
	ExtractLevelProps<BreadcrumbListProps, ItemListProps>
>

export default function BreadcrumbList({
	schemaType = "BreadcrumbList",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<ItemList
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
