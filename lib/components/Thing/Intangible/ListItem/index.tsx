import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type ListItemProps from "../../../../types/Thing/ListItem/index.ts"

import Intangible from "./index.tsx"

export type Props = BaseComponentProps<
	ListItemProps,
	"ListItem",
	ExtractLevelProps<ListItemProps, IntangibleProps>
>

export default function ListItem(
	{
		item,
		nextItem,
		position,
		previousItem,
		schemaType = "ListItem",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				item,
				nextItem,
				position,
				previousItem,
				...subtypeProperties,
			}}
		/>
	)
}
