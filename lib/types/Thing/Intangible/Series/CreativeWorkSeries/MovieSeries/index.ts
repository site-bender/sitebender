import type VideoObject from "../../../../CreativeWork/MediaObject/VideoObject/index.ts"
import type Thing from "../../../../index.ts"
import type Organization from "../../../../Organization/index.ts"
import type PerformingGroup from "../../../../Organization/PerformingGroup/index.ts"
import type MusicGroup from "../../../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Person from "../../../../Person/index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { SeriesProps } from "../../index.ts"
import type { CreativeWorkSeriesProps } from "../index.ts"

export interface MovieSeriesProps {
	/** An actor (individual or a group), e.g. in TV, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
	actor?: PerformingGroup | Person
	/** An actor, e.g. in TV, radio, movie, video games etc. Actors can be associated with individual items or with a series, episode, clip. */
	actors?: Person
	/** A director of e.g. TV, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
	director?: Person
	/** A director of e.g. TV, radio, movie, video games etc. content. Directors can be associated with individual items or with a series, episode, clip. */
	directors?: Person
	/** The composer of the soundtrack. */
	musicBy?: MusicGroup | Person
	/** The production company or studio responsible for the item, e.g. series, video game, episode etc. */
	productionCompany?: Organization
	/** The trailer of a movie or TV/radio series, season, episode, etc. */
	trailer?: VideoObject
}

type MovieSeries =
	& Thing
	& CreativeWorkSeriesProps
	& IntangibleProps
	& SeriesProps
	& MovieSeriesProps

export default MovieSeries
