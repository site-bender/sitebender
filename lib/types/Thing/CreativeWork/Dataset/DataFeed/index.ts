import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type DataFeedItem from "../../../Intangible/DataFeedItem/index.ts"
import type Dataset from "../index.ts"

export default interface DataFeed extends Dataset {
	/** An item within a data feed. Data feeds may have many elements. */
	dataFeedElement?: DataFeedItem | Thing | Text
}
