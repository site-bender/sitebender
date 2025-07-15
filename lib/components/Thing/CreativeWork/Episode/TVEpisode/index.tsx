import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EpisodeProps from "../../../../../types/Thing/Episode/index.ts"
import type TVEpisodeProps from "../../../../../types/Thing/TVEpisode/index.ts"

import Episode from "./index.tsx"

export type Props = BaseComponentProps<
	TVEpisodeProps,
	"TVEpisode",
	ExtractLevelProps<TVEpisodeProps, EpisodeProps>
>

export default function TVEpisode(
	{
		countryOfOrigin,
		partOfTVSeries,
		subtitleLanguage,
		titleEIDR,
		schemaType = "TVEpisode",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Episode
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				countryOfOrigin,
				partOfTVSeries,
				subtitleLanguage,
				titleEIDR,
				...subtypeProperties,
			}}
		/>
	)
}
