import type { Date, DateTime } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

import ThingComponent from "../../../../components/Thing/index.ts"

export type DataFeedItemType = "DataFeedItem"

export interface DataFeedItemProps {
	"@type"?: DataFeedItemType
	dateCreated?: Date | DateTime
	dateDeleted?: Date | DateTime
	dateModified?: Date | DateTime
	item?: Thing | ReturnType<typeof ThingComponent>
}

type DataFeedItem = Thing & IntangibleProps & DataFeedItemProps

export default DataFeedItem
