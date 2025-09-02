import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Language from "../../../Intangible/Language/index.ts"
import type Country from "../../../Place/AdministrativeArea/Country/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type TVSeries from "../../TVSeries/index.ts"
import type { EpisodeProps } from "../index.ts"

import { Country as CountryComponent } from "../../../../../../components/index.tsx"
import { Language as LanguageComponent } from "../../../../../../components/index.tsx"
import { TVSeries as TVSeriesComponent } from "../../../../../../components/index.tsx"

export type TVEpisodeType = "TVEpisode"

export interface TVEpisodeProps {
	"@type"?: TVEpisodeType
	countryOfOrigin?: Country | ReturnType<typeof CountryComponent>
	partOfTVSeries?: TVSeries | ReturnType<typeof TVSeriesComponent>
	subtitleLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	titleEIDR?: Text | URL
}

type TVEpisode = Thing & CreativeWorkProps & EpisodeProps & TVEpisodeProps

export default TVEpisode
