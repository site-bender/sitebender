import type BaseProps from "../../../../../../types/index.ts"
import type VideoObjectSnapshotProps from "../../../../../../types/Thing/CreativeWork/MediaObject/VideoObject/VideoObjectSnapshot/index.ts"

import VideoObject from "../index.tsx"

export type Props = VideoObjectSnapshotProps & BaseProps

export default function VideoObjectSnapshot({
	_type = "VideoObjectSnapshot",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<VideoObject
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
