import type BaseProps from "../../../../types/index.ts"
import type { ComedyEvent as ComedyEventProps } from "../../../../types/index.ts"

import Event from "../index.tsx"

export type Props = ComedyEventProps & BaseProps

export default function ComedyEvent({
	_type = "ComedyEvent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
