import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MediaObjectProps from "../../../../../types/Thing/MediaObject/index.ts"
import type MusicVideoObjectProps from "../../../../../types/Thing/MusicVideoObject/index.ts"

import MediaObject from "../index.tsx"

// MusicVideoObject adds no properties to the MediaObject schema type
export type Props = BaseComponentProps<
	MusicVideoObjectProps,
	"MusicVideoObject",
	ExtractLevelProps<MusicVideoObjectProps, MediaObjectProps>
>

export default function MusicVideoObject({
	schemaType = "MusicVideoObject",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MediaObject
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
