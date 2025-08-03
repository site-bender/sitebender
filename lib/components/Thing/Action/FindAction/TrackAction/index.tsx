import type BaseProps from "../../../../../types/index.ts"
import type { TrackAction as TrackActionProps } from "../../../../../types/index.ts"

import FindAction from "../index.tsx"

export type Props = TrackActionProps & BaseProps

export default function TrackAction({
	_type = "TrackAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
