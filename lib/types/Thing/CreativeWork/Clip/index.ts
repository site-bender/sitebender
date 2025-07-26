import type { Integer, Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type CreativeWorkSeason from "../CreativeWorkSeason/index.ts"
import type CreativeWorkSeries from "../CreativeWorkSeries/index.ts"
import type Episode from "../Episode/index.ts"
import type HyperTocEntry from "../HyperTocEntry/index.ts"
import type MusicGroup from "../../Organization/PerformingGroup/MusicGroup/index.ts"
import type PerformingGroup from "../../Organization/PerformingGroup/index.ts"
import type Person from "../../Person/index.ts"

export interface ClipProps {
	actor?: PerformingGroup | Person
	actors?: Person
	clipNumber?: Integer | Text
	director?: Person
	directors?: Person
	endOffset?: HyperTocEntry | Number
	musicBy?: MusicGroup | Person
	partOfEpisode?: Episode
	partOfSeason?: CreativeWorkSeason
	partOfSeries?: CreativeWorkSeries
	startOffset?: HyperTocEntry | Number
}

type Clip =
	& Thing
	& CreativeWorkProps
	& ClipProps

export default Clip
