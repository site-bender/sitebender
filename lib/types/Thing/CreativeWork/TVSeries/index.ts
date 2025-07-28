import type { Integer, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { CreativeWorkSeriesProps } from "../CreativeWorkSeries/index.ts"
import type { IntangibleProps } from "../../Intangible/index.ts"
import type { SeriesProps } from "../../Intangible/Series/index.ts"
import type Country from "../../Place/AdministrativeArea/Country/index.ts"
import type CreativeWorkSeason from "../CreativeWorkSeason/index.ts"
import type Episode from "../Episode/index.ts"
import type MusicGroup from "../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Organization from "../../Organization/index.ts"
import type PerformingGroup from "../../Organization/PerformingGroup/index.ts"
import type Person from "../../Person/index.ts"
import type VideoObject from "../MediaObject/VideoObject/index.ts"

import TVSeriesComponent from "../../../../../components/Thing/CreativeWork/TVSeries/index.tsx"

export interface TVSeriesProps {
	actor?: PerformingGroup | Person
	actors?: Person
	containsSeason?: CreativeWorkSeason
	countryOfOrigin?: Country
	director?: Person
	directors?: Person
	episode?: Episode
	episodes?: Episode
	musicBy?: MusicGroup | Person
	numberOfEpisodes?: Integer
	numberOfSeasons?: Integer
	productionCompany?: Organization
	season?: CreativeWorkSeason | URL
	seasons?: CreativeWorkSeason
	titleEIDR?: Text | URL
	trailer?: VideoObject
}

type TVSeries =
	& Thing
	& CreativeWorkProps
	& CreativeWorkSeriesProps
	& IntangibleProps
	& SeriesProps
	& TVSeriesProps

export default TVSeries
