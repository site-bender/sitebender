// CompleteDataFeed extends DataFeed but adds no additional properties
import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { DatasetProps } from "../../index.ts"
import type { DataFeedProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface CompleteDataFeedProps {}

type CompleteDataFeed =
	& Thing
	& CreativeWorkProps
	& DataFeedProps
	& DatasetProps
	& CompleteDataFeedProps

export default CompleteDataFeed
