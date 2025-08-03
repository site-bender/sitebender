import type BaseProps from "../../../../types/index.ts"
import type { MusicEvent as MusicEventProps } from "../../../../types/index.ts"

import Event from "../index.tsx"

export type Props = MusicEventProps & BaseProps

export default function MusicEvent({
	_type = "MusicEvent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
