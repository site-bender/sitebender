import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CreativeWorkSeasonProps from "../../../../../types/Thing/CreativeWorkSeason/index.ts"
import type PodcastSeasonProps from "../../../../../types/Thing/PodcastSeason/index.ts"

import CreativeWorkSeason from "../index.tsx"

// PodcastSeason adds no properties to the CreativeWorkSeason schema type
export type Props = BaseComponentProps<
	PodcastSeasonProps,
	"PodcastSeason",
	ExtractLevelProps<PodcastSeasonProps, CreativeWorkSeasonProps>
>

export default function PodcastSeason({
	schemaType = "PodcastSeason",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CreativeWorkSeason
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
