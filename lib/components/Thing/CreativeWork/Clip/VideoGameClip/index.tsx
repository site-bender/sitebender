import type BaseProps from "../../../../../types/index.ts"
import type VideoGameClipProps from "../../../../../types/Thing/CreativeWork/Clip/VideoGameClip/index.ts"

import Clip from "../index.tsx"

export type Props = VideoGameClipProps & BaseProps

export default function VideoGameClip({
	_type = "VideoGameClip",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Clip
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Clip>
	)
}
