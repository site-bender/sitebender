import type BaseProps from "../../../../types/index.ts"
import type { SportsEvent as SportsEventProps } from "../../../../types/index.ts"

import Event from "../index.tsx"

export type Props = SportsEventProps & BaseProps

export default function SportsEvent({
	_type = "SportsEvent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
