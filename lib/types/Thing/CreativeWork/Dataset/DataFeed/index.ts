import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type Thing from "../../../index.ts"
import type DataFeedItem from "../../../Intangible/DataFeedItem/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DatasetProps } from "../index.ts"

export interface DataFeedProps {
	/** An item within a data feed. Data feeds may have many elements. */
	dataFeedElement?: DataFeedItem | Thing | Text
}

type DataFeed =
	& Thing
	& CreativeWorkProps
	& DatasetProps
	& DataFeedProps

export default DataFeed
