import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CompleteDataFeedProps from "../../../../../../types/Thing/CompleteDataFeed/index.ts"
import type DataFeedProps from "../../../../../../types/Thing/DataFeed/index.ts"

import DataFeed from "../index.tsx"

// CompleteDataFeed adds no properties to the DataFeed schema type
export type Props = BaseComponentProps<
	CompleteDataFeedProps,
	"CompleteDataFeed",
	ExtractLevelProps<CompleteDataFeedProps, DataFeedProps>
>

export default function CompleteDataFeed({
	schemaType = "CompleteDataFeed",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<DataFeed
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
