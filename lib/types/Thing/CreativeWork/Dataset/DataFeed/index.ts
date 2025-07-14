import { Text } from "../../../../DataType/index.ts"
import Thing from "../../../../index.ts"
import DataFeedItem from "../../../Intangible/DataFeedItem/index.ts"
import Dataset from "../index.ts"

export default interface DataFeed extends Dataset {
	/** An item within a data feed. Data feeds may have many elements. */
	dataFeedElement?: DataFeedItem | Thing | Text
}
