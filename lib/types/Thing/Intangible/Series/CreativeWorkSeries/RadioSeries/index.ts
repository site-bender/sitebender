import type { Integer, URL } from "../../../../../DataType/index.ts"
import type CreativeWorkSeason from "../../../../CreativeWork/CreativeWorkSeason/index.ts"
import type Episode from "../../../../CreativeWork/Episode/index.ts"
import type VideoObject from "../../../../CreativeWork/MediaObject/VideoObject/index.ts"
import type Thing from "../../../../index.ts"
import type Organization from "../../../../Organization/index.ts"
import type PerformingGroup from "../../../../Organization/PerformingGroup/index.ts"
import type MusicGroup from "../../../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Person from "../../../../Person/index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { SeriesProps } from "../../index.ts"
import type { CreativeWorkSeriesProps } from "../index.ts"

export interface RadioSeriesProps {
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

type RadioSeries =
	& Thing
	& CreativeWorkSeriesProps
	& IntangibleProps
	& SeriesProps
	& RadioSeriesProps

export default RadioSeries
