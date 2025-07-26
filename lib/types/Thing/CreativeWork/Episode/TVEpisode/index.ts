import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { EpisodeProps } from "../index.ts"
import type Country from "../../../Place/AdministrativeArea/Country/index.ts"
import type Language from "../../../Intangible/Language/index.ts"
import type TVSeries from "../../TVSeries/index.ts"

export interface TVEpisodeProps {
	countryOfOrigin?: Country
	partOfTVSeries?: TVSeries
	subtitleLanguage?: Language | Text
	titleEIDR?: Text | URL
}

type TVEpisode =
	& Thing
	& CreativeWorkProps
	& EpisodeProps
	& TVEpisodeProps

export default TVEpisode
