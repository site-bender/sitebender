import type BaseProps from "../../../../../types/index.ts"
import type EventSeriesProps from "../../../../../types/Thing/Intangible/Series/EventSeries/index.ts"

import Series from "../index.tsx"

// EventSeries adds no properties to the Series schema type
export type Props = EventSeriesProps & BaseProps

export default function EventSeries({
	_type = "EventSeries",
	children,
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Series
			{...props}
			_type={_type}
			subtypeProperties={subtypeProperties}
		>
			{children}
		</Series>
	)
}
