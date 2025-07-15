import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type HowToItemProps from "../../../../../types/Thing/HowToItem/index.ts"
import type ListItemProps from "../../../../../types/Thing/ListItem/index.ts"

import ListItem from "./index.tsx"

export type Props = BaseComponentProps<
	HowToItemProps,
	"HowToItem",
	ExtractLevelProps<HowToItemProps, ListItemProps>
>

export default function HowToItem(
	{
		requiredQuantity,
		schemaType = "HowToItem",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<ListItem
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				requiredQuantity,
				...subtypeProperties,
			}}
		/>
	)
}
