import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { BroadcastChannelProps } from "../../../../types/Thing/Intangible/BroadcastChannel/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	BroadcastChannelProps,
	"BroadcastChannel",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function BroadcastChannel({
	broadcastChannelId,
	broadcastFrequency,
	broadcastServiceTier,
	genre,
	inBroadcastLineup,
	providesBroadcastService,
	schemaType = "BroadcastChannel",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				broadcastChannelId,
				broadcastFrequency,
				broadcastServiceTier,
				genre,
				inBroadcastLineup,
				providesBroadcastService,
				...subtypeProperties,
			}}
		/>
	)
}
