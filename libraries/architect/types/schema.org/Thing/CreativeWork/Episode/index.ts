import type { Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Organization from "../../Organization/index.ts"
import type PerformingGroup from "../../Organization/PerformingGroup/index.ts"
import type MusicGroup from "../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Person from "../../Person/index.ts"
import type CreativeWorkSeason from "../CreativeWorkSeason/index.ts"
import type CreativeWorkSeries from "../CreativeWorkSeries/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type VideoObject from "../MediaObject/VideoObject/index.ts"
import type { PodcastEpisodeType } from "./PodcastEpisode/index.ts"
import type { RadioEpisodeType } from "./RadioEpisode/index.ts"
import type { TVEpisodeType } from "./TVEpisode/index.ts"

import CreativeWorkSeasonComponent from "../../../../../../codewright/src/define/Thing/CreativeWork/CreativeWorkSeason/index.tsx"
import VideoObjectComponent from "../../../../../../codewright/src/define/Thing/CreativeWork/MediaObject/VideoObject/index.tsx"
import DurationComponent from "../../../../../../codewright/src/define/Thing/Intangible/Quantity/Duration/index.tsx"
import QuantitativeValueComponent from "../../../../../../codewright/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import OrganizationComponent from "../../../../../../codewright/src/define/Thing/Organization/index.tsx"
import PerformingGroupComponent from "../../../../../../codewright/src/define/Thing/Organization/PerformingGroup/index.tsx"
import MusicGroupComponent from "../../../../../../codewright/src/define/Thing/Organization/PerformingGroup/MusicGroup/index.tsx"
import PersonComponent from "../../../../../../codewright/src/define/Thing/Person/index.tsx"
import { CreativeWorkSeries as CreativeWorkSeriesComponent } from "../../../../../codewright/index.tsx"

export type EpisodeType =
	| "Episode"
	| PodcastEpisodeType
	| RadioEpisodeType
	| TVEpisodeType

export interface EpisodeProps {
	"@type"?: EpisodeType
	actor?:
		| PerformingGroup
		| Person
		| ReturnType<typeof PerformingGroupComponent>
		| ReturnType<typeof PersonComponent>
	actors?: Person | ReturnType<typeof PersonComponent>
	director?: Person | ReturnType<typeof PersonComponent>
	directors?: Person | ReturnType<typeof PersonComponent>
	duration?:
		| Duration
		| QuantitativeValue
		| ReturnType<typeof DurationComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	episodeNumber?: Integer | Text
	musicBy?:
		| MusicGroup
		| Person
		| ReturnType<typeof MusicGroupComponent>
		| ReturnType<typeof PersonComponent>
	partOfSeason?:
		| CreativeWorkSeason
		| ReturnType<typeof CreativeWorkSeasonComponent>
	partOfSeries?:
		| CreativeWorkSeries
		| ReturnType<typeof CreativeWorkSeriesComponent>
	productionCompany?: Organization | ReturnType<typeof OrganizationComponent>
	trailer?: VideoObject | ReturnType<typeof VideoObjectComponent>
}

type Episode = Thing & CreativeWorkProps & EpisodeProps

export default Episode
