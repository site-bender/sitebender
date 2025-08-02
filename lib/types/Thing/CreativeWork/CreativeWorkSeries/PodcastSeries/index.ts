import type { URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../../Intangible/index.ts"
import type { SeriesProps } from "../../../Intangible/Series/index.ts"
import type PerformingGroup from "../../../Organization/PerformingGroup/index.ts"
import type Person from "../../../Person/index.ts"
import type DataFeed from "../../Dataset/DataFeed/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { CreativeWorkSeriesProps } from "../index.ts"

import DataFeedComponent from "../../../../../components/Thing/CreativeWork/Dataset/DataFeed/index.ts"
import PerformingGroupComponent from "../../../../../components/Thing/Organization/PerformingGroup/index.ts"
import PersonComponent from "../../../../../components/Thing/Person/index.ts"

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
