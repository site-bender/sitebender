import type BaseProps from "../../../../../types/index.ts"
import type { TheaterEvent as TheaterEventProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = TheaterEventProps & BaseProps

export default function TheaterEvent({
	_type = "TheaterEvent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
