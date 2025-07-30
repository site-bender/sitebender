import type { Date, DateTime, Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type PerformingGroup from "../../Organization/PerformingGroup/index.ts"
import type Person from "../../Person/index.ts"
import type CreativeWorkSeries from "../CreativeWorkSeries/index.ts"
import type Episode from "../Episode/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type VideoObject from "../MediaObject/VideoObject/index.ts"

import CreativeWorkSeriesComponent from "../../../../components/Thing/CreativeWork/CreativeWorkSeries/index.ts"
import EpisodeComponent from "../../../../components/Thing/CreativeWork/Episode/index.ts"
import VideoObjectComponent from "../../../../components/Thing/CreativeWork/MediaObject/VideoObject/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PerformingGroupComponent from "../../../../components/Thing/Organization/PerformingGroup/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"

export interface CreativeWorkSeasonProps {
	"@type"?: "CreativeWorkSeason"
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
