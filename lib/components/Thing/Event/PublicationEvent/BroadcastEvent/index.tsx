import type BaseProps from "../../../../../types/index.ts"
import type BroadcastEventProps from "../../../../../types/Thing/Event/PublicationEvent/BroadcastEvent/index.ts"

import PublicationEvent from "../index.tsx"

export type Props = BroadcastEventProps & BaseProps

export default function BroadcastEvent({
	broadcastOfEvent,
	isLiveBroadcast,
	subtitleLanguage,
	videoFormat,
	_type = "BroadcastEvent",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PublicationEvent
			{...props}
			_type={_type}
			subtypeProperties={{
				broadcastOfEvent,
				isLiveBroadcast,
				subtitleLanguage,
				videoFormat,
				...subtypeProperties,
			}}
		>{children}</PublicationEvent>
	)
}
