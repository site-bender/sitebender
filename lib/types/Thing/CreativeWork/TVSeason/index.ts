import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Country from "../../Place/AdministrativeArea/Country/index.ts"
import type { CreativeWorkSeasonProps } from "../CreativeWorkSeason/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type TVSeries from "../TVSeries/index.ts"

import TVSeriesComponent from "../../../../components/Thing/CreativeWork/TVSeries/index.ts"
import CountryComponent from "../../../../components/Thing/Place/AdministrativeArea/Country/index.ts"

export interface TVSeasonProps {
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
