import type BaseProps from "../../../../types/index.ts"
import type { ScreeningEvent as ScreeningEventProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ScreeningEventProps & BaseProps

export default function ScreeningEvent({
	_type = "ScreeningEvent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
