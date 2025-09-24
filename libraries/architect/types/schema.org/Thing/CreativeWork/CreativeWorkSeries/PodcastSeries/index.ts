import type { URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../../Intangible/index.ts"
import type { SeriesProps } from "../../../Intangible/Series/index.ts"
import type PerformingGroup from "../../../Organization/PerformingGroup/index.ts"
import type Person from "../../../Person/index.ts"
import type DataFeed from "../../Dataset/DataFeed/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { CreativeWorkSeriesProps } from "../index.ts"

import DataFeedComponent from "../../../../../../../codewright/src/define/Thing/CreativeWork/Dataset/DataFeed/index.tsx"
import PerformingGroupComponent from "../../../../../../../codewright/src/define/Thing/Organization/PerformingGroup/index.tsx"
import PersonComponent from "../../../../../../../codewright/src/define/Thing/Person/index.tsx"

export type PodcastSeriesType = "PodcastSeries"

export interface PodcastSeriesProps {
	"@type"?: PodcastSeriesType
	actor?:
		| PerformingGroup
		| Person
		| ReturnType<typeof PerformingGroupComponent>
		| ReturnType<typeof PersonComponent>
	webFeed?: DataFeed | URL | ReturnType<typeof DataFeedComponent>
}

type PodcastSeries =
	& Thing
	& IntangibleProps
	& SeriesProps
	& CreativeWorkSeriesProps
	& CreativeWorkProps
	& PodcastSeriesProps

export default PodcastSeries
