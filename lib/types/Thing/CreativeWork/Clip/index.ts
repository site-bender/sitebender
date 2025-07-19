import type { Integer, Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type CreativeWorkSeries from "../../Intangible/Series/CreativeWorkSeries/index.ts"
import type PerformingGroup from "../../Organization/PerformingGroup/index.ts"
import type MusicGroup from "../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Person from "../../Person/index.ts"
import type CreativeWorkSeason from "../CreativeWorkSeason/index.ts"
import type Episode from "../Episode/index.ts"
import type HyperTocEntry from "../HyperTocEntry/index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface ClipProps {
	/** An actor (individual or a group), e.g. in TV, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
	actor?: PerformingGroup | Person
	/** An actor, e.g. in TV, radio, movie, video games etc. Actors can be associated with individual items or with a series, episode, clip. */
	actors?: Person
	/** Position of the clip within an ordered group of clips. */
	clipNumber?: Text | Integer
	/** A director of e.g. TV, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
	director?: Person
	/** A director of e.g. TV, radio, movie, video games etc. content. Directors can be associated with individual items or with a series, episode, clip. */
	directors?: Person
	/** The end time of the clip expressed as the number of seconds from the beginning of the work. */
	endOffset?: Number | HyperTocEntry
	/** The composer of the soundtrack. */
	musicBy?: MusicGroup | Person
	/** The episode to which this clip belongs. */
	partOfEpisode?: Episode
	/** The season to which this episode belongs. */
	partOfSeason?: CreativeWorkSeason
	/** The series to which this episode or season belongs. */
	partOfSeries?: CreativeWorkSeries
	/** The start time of the clip expressed as the number of seconds from the beginning of the work. */
	startOffset?: Number | HyperTocEntry
}

type Clip =
	& Thing
	& CreativeWorkProps
	& ClipProps

export default Clip
