import type BaseProps from "../../../../../types/index.ts"
import type { VideoObject as VideoObjectProps } from "../../../../../types/index.ts"

import MediaObject from "../index.tsx"

export type Props = VideoObjectProps & BaseProps

export default function VideoObject({
	_type = "VideoObject",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
