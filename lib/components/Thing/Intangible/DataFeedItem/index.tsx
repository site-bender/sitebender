import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { DataFeedItemProps } from "../../../../types/Thing/Intangible/DataFeedItem/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	DataFeedItemProps,
	"DataFeedItem",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function DataFeedItem({
	dateCreated,
	dateDeleted,
	dateModified,
	item,
	schemaType = "DataFeedItem",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				dateCreated,
				dateDeleted,
				dateModified,
				item,
				...subtypeProperties,
			}}
		/>
	)
}
