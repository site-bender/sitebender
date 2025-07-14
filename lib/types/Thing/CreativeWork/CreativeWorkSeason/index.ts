import { Date, DateTime, Integer, Text } from "../../../DataType/index.ts"
import CreativeWorkSeries from "../../Intangible/Series/CreativeWorkSeries/index.ts"
import Organization from "../../Organization/index.ts"
import PerformingGroup from "../../Organization/PerformingGroup/index.ts"
import Person from "../../Person/index.ts"
import Episode from "../Episode/index.ts"
import CreativeWork from "../index.ts"
import VideoObject from "../MediaObject/VideoObject/index.ts"

export default interface CreativeWorkSeason extends CreativeWork {
	/** An actor (individual or a group), e.g. in TV, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
	actor?: PerformingGroup | Person
	/** A director of e.g. TV, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
	director?: Person
	/** The end date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
	endDate?: Date | DateTime
	/** An episode of a TV, radio or game media within a series or season. */
	episode?: Episode
	/** An episode of a TV/radio series or season. */
	episodes?: Episode
	/** The number of episodes in this season or series. */
	numberOfEpisodes?: Integer
	/** The series to which this episode or season belongs. */
	partOfSeries?: CreativeWorkSeries
	/** The production company or studio responsible for the item, e.g. series, video game, episode etc. */
	productionCompany?: Organization
	/** Position of the season within an ordered group of seasons. */
	seasonNumber?: Text | Integer
	/** The start date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
	startDate?: Date | DateTime
	/** The trailer of a movie or TV/radio series, season, episode, etc. */
	trailer?: VideoObject
}
