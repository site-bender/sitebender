import type { Date, DateTime } from "../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export interface DataFeedItemProps {
	/** The date on which the CreativeWork was created or the item was added to a DataFeed. */
	dateCreated?: Date | DateTime
	/** The datetime the item was removed from the DataFeed. */
	dateDeleted?: Date | DateTime
	/** The date on which the CreativeWork was most recently modified or when the item's entry was modified within a DataFeed. */
	dateModified?: Date | DateTime
	/** An entity represented by an entry in a list or data feed (e.g. an 'artist' in a list of 'artists'). */
	item?: Thing
}

type DataFeedItem =
	& Thing
	& IntangibleProps
	& DataFeedItemProps

export default DataFeedItem
