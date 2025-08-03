import type BaseProps from "../../../../../types/index.ts"
import type { EventSeries as EventSeriesProps } from "../../../../../types/index.ts"

import Series from "../index.tsx"

// EventSeries adds no properties to the Series schema type
export type Props = EventSeriesProps & BaseProps

export default function EventSeries({
	_type = "EventSeries",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
