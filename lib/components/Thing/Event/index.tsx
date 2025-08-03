import type BaseProps from "../../../types/index.ts"
import type { Event as EventProps } from "../../../types/index.ts"

import Thing from "../index.tsx"

export type Props = EventProps & BaseProps

export default function Event({
	_type = "Event",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
