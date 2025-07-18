import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"
import type ScreeningEventProps from "../../../../types/Thing/ScreeningEvent/index.ts"

import Event from "../index.tsx"

export type Props = BaseComponentProps<
	ScreeningEventProps,
	"ScreeningEvent",
	ExtractLevelProps<ScreeningEventProps, EventProps>
>

export default function ScreeningEvent(
	{
		subtitleLanguage,
		videoFormat,
		workPresented,
		schemaType = "ScreeningEvent",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Event
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				subtitleLanguage,
				videoFormat,
				workPresented,
				...subtypeProperties,
			}}
		/>
	)
}
