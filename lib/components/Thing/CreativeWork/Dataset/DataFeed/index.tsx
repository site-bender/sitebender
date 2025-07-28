import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { DatasetProps } from "../../../../../types/Thing/CreativeWork/Dataset/index.ts"
import type { DataFeedProps } from "../../../../../types/Thing/CreativeWork/Dataset/DataFeed/index.ts"

import Dataset from "../index.tsx"

export type Props = BaseComponentProps<
	DataFeedProps,
	"DataFeed",
	ExtractLevelProps<ThingProps, CreativeWorkProps, DatasetProps>
>

export default function DataFeed({
	dataFeedElement,
	schemaType = "DataFeed",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Dataset
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				dataFeedElement,
				...subtypeProperties,
			}}
		/>
	)
}
