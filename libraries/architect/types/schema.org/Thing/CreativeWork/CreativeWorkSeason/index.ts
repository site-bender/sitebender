import type { Date, DateTime, Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type PerformingGroup from "../../Organization/PerformingGroup/index.ts"
import type Person from "../../Person/index.ts"
import type CreativeWorkSeries from "../CreativeWorkSeries/index.ts"
import type Episode from "../Episode/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type VideoObject from "../MediaObject/VideoObject/index.ts"
import type { PodcastSeasonType } from "./PodcastSeason/index.ts"
import type { RadioSeasonType } from "./RadioSeason/index.ts"
import type { TVSeasonType } from "./TVSeason/index.ts"

import EpisodeComponent from "../../../../../../pagewright/src/define/Thing/CreativeWork/Episode/index.tsx"
import VideoObjectComponent from "../../../../../../pagewright/src/define/Thing/CreativeWork/MediaObject/VideoObject/index.tsx"
import OrganizationComponent from "../../../../../../pagewright/src/define/Thing/Organization/index.tsx"
import PerformingGroupComponent from "../../../../../../pagewright/src/define/Thing/Organization/PerformingGroup/index.tsx"
import PersonComponent from "../../../../../../pagewright/src/define/Thing/Person/index.tsx"
import { CreativeWorkSeries as CreativeWorkSeriesComponent } from "../../../../../pagewright/index.tsx"

export type CreativeWorkSeasonType =
	| "CreativeWorkSeason"
	| RadioSeasonType
	| TVSeasonType
	| PodcastSeasonType

export interface CreativeWorkSeasonProps {
	"@type"?: CreativeWorkSeasonType
	actor?:
		| PerformingGroup
		| Person
		| ReturnType<typeof PerformingGroupComponent>
		| ReturnType<typeof PersonComponent>
	director?: Person | ReturnType<typeof PersonComponent>
	endDate?: Date | DateTime
	episode?: Episode | ReturnType<typeof EpisodeComponent>
	episodes?: Episode | ReturnType<typeof EpisodeComponent>
	numberOfEpisodes?: Integer
	partOfSeries?:
		| CreativeWorkSeries
		| ReturnType<typeof CreativeWorkSeriesComponent>
	productionCompany?: Organization | ReturnType<typeof OrganizationComponent>
	seasonNumber?: Integer | Text
	startDate?: Date | DateTime
	trailer?: VideoObject | ReturnType<typeof VideoObjectComponent>
}

type CreativeWorkSeason = Thing & CreativeWorkProps & CreativeWorkSeasonProps

export default CreativeWorkSeason
