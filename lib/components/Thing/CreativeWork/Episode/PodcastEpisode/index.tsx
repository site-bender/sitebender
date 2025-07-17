import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EpisodeProps from "../../../../../types/Thing/Episode/index.ts"
import type PodcastEpisodeProps from "../../../../../types/Thing/PodcastEpisode/index.ts"

import Episode from "../index.tsx"

// PodcastEpisode adds no properties to the Episode schema type
export type Props = BaseComponentProps<
	PodcastEpisodeProps,
	"PodcastEpisode",
	ExtractLevelProps<PodcastEpisodeProps, EpisodeProps>
>

export default function PodcastEpisode({
	schemaType = "PodcastEpisode",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Episode
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
