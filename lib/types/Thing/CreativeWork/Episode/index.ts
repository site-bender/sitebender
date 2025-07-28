import type { Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type CreativeWorkSeason from "../CreativeWorkSeason/index.ts"
import type CreativeWorkSeries from "../CreativeWorkSeries/index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type MusicGroup from "../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Organization from "../../Organization/index.ts"
import type PerformingGroup from "../../Organization/PerformingGroup/index.ts"
import type Person from "../../Person/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type VideoObject from "../MediaObject/VideoObject/index.ts"

import EpisodeComponent from "../../../../../components/Thing/CreativeWork/Episode/index.tsx"

export interface EpisodeProps {
	actor?: PerformingGroup | Person
	actors?: Person
	director?: Person
	directors?: Person
	duration?: Duration | QuantitativeValue
	episodeNumber?: Integer | Text
	musicBy?: MusicGroup | Person
	partOfSeason?: CreativeWorkSeason
	partOfSeries?: CreativeWorkSeries
	productionCompany?: Organization
	trailer?: VideoObject
}

type Episode =
	& Thing
	& CreativeWorkProps
	& EpisodeProps

export default Episode
