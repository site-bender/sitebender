import type BaseProps from "../../../../types/index.ts"
import type { DataFeedItemProps } from "../../../../types/Thing/Intangible/DataFeedItem/index.ts"

import Intangible from "../index.tsx"

export type Props = DataFeedItemProps & BaseProps

export default function DataFeedItem({
	dateCreated,
	dateDeleted,
	dateModified,
	item,
	_type = "DataFeedItem",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
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
