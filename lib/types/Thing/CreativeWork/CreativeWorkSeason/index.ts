import type { Date, DateTime, Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type CreativeWorkSeries from "../CreativeWorkSeries/index.ts"
import type Episode from "../Episode/index.ts"
import type Organization from "../../Organization/index.ts"
import type PerformingGroup from "../../Organization/PerformingGroup/index.ts"
import type Person from "../../Person/index.ts"
import type VideoObject from "../MediaObject/VideoObject/index.ts"

export interface CreativeWorkSeasonProps {
	actor?: PerformingGroup | Person
	director?: Person
	endDate?: Date | DateTime
	episode?: Episode
	episodes?: Episode
	numberOfEpisodes?: Integer
	partOfSeries?: CreativeWorkSeries
	productionCompany?: Organization
	seasonNumber?: Integer | Text
	startDate?: Date | DateTime
	trailer?: VideoObject
}

type CreativeWorkSeason =
	& Thing
	& CreativeWorkProps
	& CreativeWorkSeasonProps

export default CreativeWorkSeason
