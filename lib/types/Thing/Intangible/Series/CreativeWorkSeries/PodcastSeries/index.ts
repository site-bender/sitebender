import { URL } from "../../../../../DataType/index.ts"
import DataFeed from "../../../../CreativeWork/Dataset/DataFeed/index.ts"
import PerformingGroup from "../../../../Organization/PerformingGroup/index.ts"
import Person from "../../../../Person/index.ts"
import CreativeWorkSeries from "../index.ts"

export default interface PodcastSeries extends CreativeWorkSeries {
	/** An actor (individual or a group), e.g. in TV, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
	actor?: PerformingGroup | Person
	/** The URL for a feed, e.g. associated with a podcast series, blog, or series of date-stamped updates. This is usually RSS or Atom. */
	webFeed?: URL | DataFeed
}
