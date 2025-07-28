import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { DatasetProps } from "../../index.ts"
import type { DataFeedProps } from "../index.ts"

import CompleteDataFeedComponent from "../../../../../../../components/Thing/CreativeWork/Dataset/DataFeed/CompleteDataFeed/index.tsx"

export interface CompleteDataFeedProps {
}

type CompleteDataFeed =
	& Thing
	& CreativeWorkProps
	& DatasetProps
	& DataFeedProps
	& CompleteDataFeedProps

export default CompleteDataFeed
