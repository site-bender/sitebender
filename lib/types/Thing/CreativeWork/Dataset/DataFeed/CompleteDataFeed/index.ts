import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { DatasetProps } from "../../index.ts"
import type { DataFeedProps } from "../index.ts"

export interface CompleteDataFeedProps {}

type CompleteDataFeed =
	& Thing
	& CreativeWorkProps
	& DatasetProps
	& DataFeedProps
	& CompleteDataFeedProps

export default CompleteDataFeed
