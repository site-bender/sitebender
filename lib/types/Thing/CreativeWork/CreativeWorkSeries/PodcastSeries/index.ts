import type { URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../../Intangible/index.ts"
import type { SeriesProps } from "../../../Intangible/Series/index.ts"
import type { CreativeWorkSeriesProps } from "../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type DataFeed from "../../Dataset/DataFeed/index.ts"
import type PerformingGroup from "../../../Organization/PerformingGroup/index.ts"
import type Person from "../../../Person/index.ts"

export interface PodcastSeriesProps {
	actor?: PerformingGroup | Person
	webFeed?: DataFeed | URL
}

type PodcastSeries =
	& Thing
	& IntangibleProps
	& SeriesProps
	& CreativeWorkSeriesProps
	& CreativeWorkProps
	& PodcastSeriesProps

export default PodcastSeries
