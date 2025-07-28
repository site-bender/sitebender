import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { EventProps } from "../../../../../types/Thing/Event/index.ts"
import type { PublicationEventProps } from "../../../../../types/Thing/Event/PublicationEvent/index.ts"
import type { BroadcastEventProps } from "../../../../../types/Thing/Event/PublicationEvent/BroadcastEvent/index.ts"

import PublicationEvent from "../index.tsx"

export type Props = BaseComponentProps<
	BroadcastEventProps,
	"BroadcastEvent",
	ExtractLevelProps<ThingProps, EventProps, PublicationEventProps>
>

export default function BroadcastEvent({
	broadcastOfEvent,
	isLiveBroadcast,
	subtitleLanguage,
	videoFormat,
	schemaType = "BroadcastEvent",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<PublicationEvent
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				broadcastOfEvent,
				isLiveBroadcast,
				subtitleLanguage,
				videoFormat,
				...subtypeProperties,
			}}
		/>
	)
}
