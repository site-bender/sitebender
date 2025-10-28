import type BaseProps from "../../../../../types/index.ts"
import type { MusicRecording as MusicRecordingProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MusicRecordingProps & BaseProps

export default function MusicRecording({
	_type = "MusicRecording",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
