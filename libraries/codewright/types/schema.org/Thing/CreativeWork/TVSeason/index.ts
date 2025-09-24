import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Country from "../../Place/AdministrativeArea/Country/index.ts"
import type { CreativeWorkSeasonProps } from "../CreativeWorkSeason/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type TVSeries from "../TVSeries/index.ts"

import TVSeriesComponent from "../../../../../src/define/Thing/CreativeWork/TVSeries/index.tsx"
import CountryComponent from "../../../../../src/define/Thing/Place/AdministrativeArea/Country/index.tsx"

export type TVSeasonType = "TVSeason"

export interface TVSeasonProps {
	"@type"?: TVSeasonType
	countryOfOrigin?: Country | ReturnType<typeof CountryComponent>
	partOfTVSeries?: TVSeries | ReturnType<typeof TVSeriesComponent>
	titleEIDR?: Text | URL
}

type TVSeason =
	& Thing
	& CreativeWorkProps
	& CreativeWorkSeasonProps
	& TVSeasonProps

export default TVSeason
