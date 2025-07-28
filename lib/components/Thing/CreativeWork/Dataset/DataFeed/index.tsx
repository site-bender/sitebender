import type BaseProps from "../../../../../types/index.ts"
import type { DataFeedProps } from "../../../../../types/Thing/CreativeWork/Dataset/DataFeed/index.ts"

import Dataset from "../index.tsx"

export type Props = DataFeedProps & BaseProps

export default function DataFeed({
	dataFeedElement,
	_type = "DataFeed",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Dataset
			{...props}
			_type={_type}
			subtypeProperties={{
				dataFeedElement,
				...subtypeProperties,
			}}
		/>
	)
}
