import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EventSeriesProps from "../../../../../types/Thing/EventSeries/index.ts"
import type SeriesProps from "../../../../../types/Thing/Series/index.ts"

import Series from "./index.tsx"

// EventSeries adds no properties to the Series schema type
export type Props = BaseComponentProps<
	EventSeriesProps,
	"EventSeries",
	ExtractLevelProps<EventSeriesProps, SeriesProps>
>

export default function EventSeries({
	schemaType = "EventSeries",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Series
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
