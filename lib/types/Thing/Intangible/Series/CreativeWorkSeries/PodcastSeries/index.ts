import type { URL } from "../../../../../DataType/index.ts"
import type DataFeed from "../../../../CreativeWork/Dataset/DataFeed/index.ts"
import type Thing from "../../../../index.ts"
import type PerformingGroup from "../../../../Organization/PerformingGroup/index.ts"
import type Person from "../../../../Person/index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { SeriesProps } from "../../index.ts"
import type { CreativeWorkSeriesProps } from "../index.ts"

export interface PodcastSeriesProps {
	/** An actor (individual or a group), e.g. in TV, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
	actor?: PerformingGroup | Person
	/** The URL for a feed, e.g. associated with a podcast series, blog, or series of date-stamped updates. This is usually RSS or Atom. */
	webFeed?: URL | DataFeed
}

type PodcastSeries =
	& Thing
	& CreativeWorkSeriesProps
	& IntangibleProps
	& SeriesProps
	& PodcastSeriesProps

export default PodcastSeries
