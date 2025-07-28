import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { CreativeWorkSeasonProps } from "../CreativeWorkSeason/index.ts"
import type Country from "../../Place/AdministrativeArea/Country/index.ts"
import type TVSeries from "../TVSeries/index.ts"

import TVSeasonComponent from "../../../../../components/Thing/CreativeWork/TVSeason/index.tsx"

export interface TVSeasonProps {
	countryOfOrigin?: Country
	partOfTVSeries?: TVSeries
	titleEIDR?: Text | URL
}

type TVSeason =
	& Thing
	& CreativeWorkProps
	& CreativeWorkSeasonProps
	& TVSeasonProps

export default TVSeason
