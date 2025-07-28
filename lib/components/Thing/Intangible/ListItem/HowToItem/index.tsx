import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { ListItemProps } from "../../../../../types/Thing/Intangible/ListItem/index.ts"
import type { HowToItemProps } from "../../../../../types/Thing/Intangible/ListItem/HowToItem/index.ts"

import ListItem from "../index.tsx"

export type Props = BaseComponentProps<
	HowToItemProps,
	"HowToItem",
	ExtractLevelProps<ThingProps, IntangibleProps, ListItemProps>
>

export default function HowToItem({
	requiredQuantity,
	schemaType = "HowToItem",
	subtypeProperties = {},
	...props
}): Props {
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
