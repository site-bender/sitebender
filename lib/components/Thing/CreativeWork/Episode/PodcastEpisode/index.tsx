import type BaseProps from "../../../../../types/index.ts"
import type PodcastEpisodeProps from "../../../../../types/Thing/CreativeWork/Episode/PodcastEpisode/index.ts"

import Episode from "../index.tsx"

export type Props = PodcastEpisodeProps & BaseProps

export default function PodcastEpisode({
	_type = "PodcastEpisode",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Episode
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Episode>
	)
}
