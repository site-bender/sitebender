import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MediaObjectProps from "../../../../../types/Thing/MediaObject/index.ts"
import type VideoObjectProps from "../../../../../types/Thing/VideoObject/index.ts"

import MediaObject from "../index.tsx"

export type Props = BaseComponentProps<
	VideoObjectProps,
	"VideoObject",
	ExtractLevelProps<VideoObjectProps, MediaObjectProps>
>

export default function VideoObject(
	{
		actor,
		actors,
		caption,
		director,
		directors,
		embeddedTextCaption,
		musicBy,
		transcript,
		videoFrameSize,
		videoQuality,
		schemaType = "VideoObject",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MediaObject
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				actor,
				actors,
				caption,
				director,
				directors,
				embeddedTextCaption,
				musicBy,
				transcript,
				videoFrameSize,
				videoQuality,
				...subtypeProperties,
			}}
		/>
	)
}
