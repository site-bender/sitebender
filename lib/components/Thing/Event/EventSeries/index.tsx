import type BaseProps from "../../../../types/index.ts"
import type { EventSeries as EventSeriesProps } from "../../../../types/index.ts"

import Event from "../index.tsx"

export type Props = EventSeriesProps & BaseProps

export default function EventSeries({
	_type = "EventSeries",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
