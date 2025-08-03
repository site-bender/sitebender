import type BaseProps from "../../../../../types/index.ts"
import type { VideoGameClip as VideoGameClipProps } from "../../../../../types/index.ts"

import Clip from "../index.tsx"

export type Props = VideoGameClipProps & BaseProps

export default function VideoGameClip({
	_type = "VideoGameClip",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
