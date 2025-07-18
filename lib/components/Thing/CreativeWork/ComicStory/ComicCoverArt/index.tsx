import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ComicCoverArtProps from "../../../../../types/Thing/ComicCoverArt/index.ts"
import type ComicStoryProps from "../../../../../types/Thing/ComicStory/index.ts"

import ComicStory from "../index.tsx"

// ComicCoverArt adds no properties to the ComicStory schema type
export type Props = BaseComponentProps<
	ComicCoverArtProps,
	"ComicCoverArt",
	ExtractLevelProps<ComicCoverArtProps, ComicStoryProps>
>

export default function ComicCoverArt({
	schemaType = "ComicCoverArt",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<ComicStory
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
