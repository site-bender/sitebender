import type { Date, DateTime } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export interface DataFeedItemProps {
	dateCreated?: Date | DateTime
	dateDeleted?: Date | DateTime
	dateModified?: Date | DateTime
	item?: Thing
}

type DataFeedItem =
	& Thing
	& IntangibleProps
	& DataFeedItemProps

export default DataFeedItem
