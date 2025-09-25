import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type DataFeedItem from "../../../Intangible/DataFeedItem/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DatasetProps } from "../index.ts"
import type { CompleteDataFeedType } from "./CompleteDataFeed/index.ts"

import ThingComponent from "../../../../../../../pagewright/src/define/Thing/index.tsx"
import DataFeedItemComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/DataFeedItem/index.tsx"

export type DataFeedType = "DataFeed" | CompleteDataFeedType

export interface DataFeedProps {
	"@type"?: DataFeedType
	dataFeedElement?:
		| DataFeedItem
		| Text
		| Thing
		| ReturnType<typeof DataFeedItemComponent>
		| ReturnType<typeof ThingComponent>
}

type DataFeed = Thing & CreativeWorkProps & DatasetProps & DataFeedProps

export default DataFeed
