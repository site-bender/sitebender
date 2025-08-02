import type BaseProps from "../../../../types/index.ts"
import type ScreeningEventProps from "../../../../types/Thing/Event/ScreeningEvent/index.ts"

import Event from "../index.tsx"

export type Props = ScreeningEventProps & BaseProps

export default function ScreeningEvent({
	subtitleLanguage,
	videoFormat,
	workPresented,
	_type = "ScreeningEvent",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Event
			{...props}
			_type={_type}
			subtypeProperties={{
				subtitleLanguage,
				videoFormat,
				workPresented,
				...subtypeProperties,
			}}
		>
			{children}
		</Event>
	)
}
