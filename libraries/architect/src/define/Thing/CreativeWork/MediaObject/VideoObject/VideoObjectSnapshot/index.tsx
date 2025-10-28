import type BaseProps from "../../../../../../../types/index.ts"
import type { VideoObjectSnapshot as VideoObjectSnapshotProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = VideoObjectSnapshotProps & BaseProps

export default function VideoObjectSnapshot({
	_type = "VideoObjectSnapshot",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
