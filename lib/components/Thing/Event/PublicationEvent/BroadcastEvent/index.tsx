import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BroadcastEventProps from "../../../../../types/Thing/BroadcastEvent/index.ts"
import type PublicationEventProps from "../../../../../types/Thing/PublicationEvent/index.ts"

import PublicationEvent from "./index.tsx"

export type Props = BaseComponentProps<
	BroadcastEventProps,
	"BroadcastEvent",
	ExtractLevelProps<BroadcastEventProps, PublicationEventProps>
>

export default function BroadcastEvent(
	{
		broadcastOfEvent,
		isLiveBroadcast,
		subtitleLanguage,
		videoFormat,
		schemaType = "BroadcastEvent",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
