import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ClipProps from "../../../../../types/Thing/Clip/index.ts"
import type VideoGameClipProps from "../../../../../types/Thing/VideoGameClip/index.ts"

import Clip from "../index.tsx"

// VideoGameClip adds no properties to the Clip schema type
export type Props = BaseComponentProps<
	VideoGameClipProps,
	"VideoGameClip",
	ExtractLevelProps<VideoGameClipProps, ClipProps>
>

export default function VideoGameClip({
	schemaType = "VideoGameClip",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Clip
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
