import type BaseProps from "../../../../types/index.ts"
import type EventSeriesProps from "../../../../types/Thing/Event/EventSeries/index.ts"

import Event from "../index.tsx"

export type Props = EventSeriesProps & BaseProps

export default function EventSeries({
	_type = "EventSeries",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Event
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Event>
	)
}
