import type { Integer, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../../Intangible/index.ts"
import type { SeriesProps } from "../../../Intangible/Series/index.ts"
import type { CreativeWorkSeriesProps } from "../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type CreativeWorkSeason from "../../CreativeWorkSeason/index.ts"
import type Episode from "../../Episode/index.ts"
import type MusicGroup from "../../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Organization from "../../../Organization/index.ts"
import type PerformingGroup from "../../../Organization/PerformingGroup/index.ts"
import type Person from "../../../Person/index.ts"
import type VideoObject from "../../MediaObject/VideoObject/index.ts"

import RadioSeriesComponent from "../../../../../../components/Thing/CreativeWork/CreativeWorkSeries/RadioSeries/index.tsx"

export interface RadioSeriesProps {
	actor?: PerformingGroup | Person
	actors?: Person
	containsSeason?: CreativeWorkSeason
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
	trailer?: VideoObject
}

type RadioSeries =
	& Thing
	& IntangibleProps
	& SeriesProps
	& CreativeWorkSeriesProps
	& CreativeWorkProps
	& RadioSeriesProps

export default RadioSeries
