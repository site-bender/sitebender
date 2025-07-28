import type BaseProps from "../../../../../types/index.ts"
import type { TVEpisodeProps } from "../../../../../types/Thing/CreativeWork/Episode/TVEpisode/index.ts"

import Episode from "../index.tsx"

export type Props = TVEpisodeProps & BaseProps

export default function TVEpisode({
	countryOfOrigin,
	partOfTVSeries,
	subtitleLanguage,
	titleEIDR,
	_type = "TVEpisode",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Episode
			{...props}
			_type={_type}
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
