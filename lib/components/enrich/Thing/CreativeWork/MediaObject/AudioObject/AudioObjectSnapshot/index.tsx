import type BaseProps from "../../../../../../types/index.ts"
import type { AudioObjectSnapshot as AudioObjectSnapshotProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = AudioObjectSnapshotProps & BaseProps

export default function AudioObjectSnapshot({
	_type = "AudioObjectSnapshot",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
