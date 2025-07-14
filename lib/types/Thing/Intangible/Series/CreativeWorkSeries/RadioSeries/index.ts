import { Integer, URL } from "../../../../../DataType/index.ts"
import CreativeWorkSeason from "../../../../CreativeWork/CreativeWorkSeason/index.ts"
import Episode from "../../../../CreativeWork/Episode/index.ts"
import VideoObject from "../../../../CreativeWork/MediaObject/VideoObject/index.ts"
import Organization from "../../../../Organization/index.ts"
import PerformingGroup from "../../../../Organization/PerformingGroup/index.ts"
import MusicGroup from "../../../../Organization/PerformingGroup/MusicGroup/index.ts"
import Person from "../../../../Person/index.ts"
import CreativeWorkSeries from "../index.ts"

export default interface RadioSeries extends CreativeWorkSeries {
	/** An actor (individual or a group), e.g. in TV, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
	actor?: PerformingGroup | Person
	/** An actor, e.g. in TV, radio, movie, video games etc. Actors can be associated with individual items or with a series, episode, clip. */
	actors?: Person
	/** A season that is part of the media series. */
	containsSeason?: CreativeWorkSeason
	/** A director of e.g. TV, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
	director?: Person
	/** A director of e.g. TV, radio, movie, video games etc. content. Directors can be associated with individual items or with a series, episode, clip. */
	directors?: Person
	/** An episode of a TV, radio or game media within a series or season. */
	episode?: Episode
	/** An episode of a TV/radio series or season. */
	episodes?: Episode
	/** The composer of the soundtrack. */
	musicBy?: MusicGroup | Person
	/** The number of episodes in this season or series. */
	numberOfEpisodes?: Integer
	/** The number of seasons in this series. */
	numberOfSeasons?: Integer
	/** The production company or studio responsible for the item, e.g. series, video game, episode etc. */
	productionCompany?: Organization
	/** A season in a media series. */
	season?: CreativeWorkSeason | URL
	/** A season in a media series. */
	seasons?: CreativeWorkSeason
	/** The trailer of a movie or TV/radio series, season, episode, etc. */
	trailer?: VideoObject
}
