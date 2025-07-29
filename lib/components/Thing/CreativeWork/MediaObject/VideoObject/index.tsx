import type BaseProps from "../../../../../types/index.ts"
import type VideoObjectProps from "../../../../../types/Thing/CreativeWork/MediaObject/VideoObject/index.ts"

import MediaObject from "../index.tsx"

export type Props = VideoObjectProps & BaseProps

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
	_type = "VideoObject",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MediaObject
			{...props}
			_type={_type}
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
