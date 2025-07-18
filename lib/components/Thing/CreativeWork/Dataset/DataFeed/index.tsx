import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DataFeedProps from "../../../../../types/Thing/DataFeed/index.ts"
import type DatasetProps from "../../../../../types/Thing/Dataset/index.ts"

import Dataset from "../index.tsx"

export type Props = BaseComponentProps<
	DataFeedProps,
	"DataFeed",
	ExtractLevelProps<DataFeedProps, DatasetProps>
>

export default function DataFeed(
	{
		dataFeedElement,
		schemaType = "DataFeed",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
