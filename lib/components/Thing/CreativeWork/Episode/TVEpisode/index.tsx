import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { EpisodeProps } from "../../../../../types/Thing/CreativeWork/Episode/index.ts"
import type { TVEpisodeProps } from "../../../../../types/Thing/CreativeWork/Episode/TVEpisode/index.ts"

import Episode from "../index.tsx"

export type Props = BaseComponentProps<
	TVEpisodeProps,
	"TVEpisode",
	ExtractLevelProps<ThingProps, CreativeWorkProps, EpisodeProps>
>

export default function TVEpisode({
	countryOfOrigin,
	partOfTVSeries,
	subtitleLanguage,
	titleEIDR,
	schemaType = "TVEpisode",
	subtypeProperties = {},
	...props
}): Props {
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
