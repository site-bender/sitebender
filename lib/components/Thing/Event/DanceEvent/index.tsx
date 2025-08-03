import type BaseProps from "../../../../types/index.ts"
import type { DanceEvent as DanceEventProps } from "../../../../types/index.ts"

import Event from "../index.tsx"

export type Props = DanceEventProps & BaseProps

export default function DanceEvent({
	_type = "DanceEvent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
