import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DatasetProps } from "../index.ts"
import type DataFeedItem from "../../../Intangible/DataFeedItem/index.ts"

export interface DataFeedProps {
	dataFeedElement?: DataFeedItem | Text | Thing
}

type DataFeed =
	& Thing
	& CreativeWorkProps
	& DatasetProps
	& DataFeedProps

export default DataFeed
