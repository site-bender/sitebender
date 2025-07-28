import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { MediaObjectProps } from "../../../../../types/Thing/CreativeWork/MediaObject/index.ts"
import type { VideoObjectProps } from "../../../../../types/Thing/CreativeWork/MediaObject/VideoObject/index.ts"

import MediaObject from "../index.tsx"

export type Props = BaseComponentProps<
	VideoObjectProps,
	"VideoObject",
	ExtractLevelProps<ThingProps, CreativeWorkProps, MediaObjectProps>
>

export default function VideoObject({
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
}): Props {
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
