import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EpisodeProps from "../../../../../types/Thing/Episode/index.ts"
import type RadioEpisodeProps from "../../../../../types/Thing/RadioEpisode/index.ts"

import Episode from "../index.tsx"

// RadioEpisode adds no properties to the Episode schema type
export type Props = BaseComponentProps<
	RadioEpisodeProps,
	"RadioEpisode",
	ExtractLevelProps<RadioEpisodeProps, EpisodeProps>
>

export default function RadioEpisode({
	schemaType = "RadioEpisode",
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
