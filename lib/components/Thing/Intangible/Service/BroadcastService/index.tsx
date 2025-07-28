import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { ServiceProps } from "../../../../../types/Thing/Intangible/Service/index.ts"
import type { BroadcastServiceProps } from "../../../../../types/Thing/Intangible/Service/BroadcastService/index.ts"

import Service from "../index.tsx"

export type Props = BaseComponentProps<
	BroadcastServiceProps,
	"BroadcastService",
	ExtractLevelProps<ThingProps, IntangibleProps, ServiceProps>
>

export default function BroadcastService({
	area,
	broadcastAffiliateOf,
	broadcastDisplayName,
	broadcaster,
	broadcastFrequency,
	broadcastTimezone,
	callSign,
	hasBroadcastChannel,
	inLanguage,
	parentService,
	videoFormat,
	schemaType = "BroadcastService",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Service
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				area,
				broadcastAffiliateOf,
				broadcastDisplayName,
				broadcaster,
				broadcastFrequency,
				broadcastTimezone,
				callSign,
				hasBroadcastChannel,
				inLanguage,
				parentService,
				videoFormat,
				...subtypeProperties,
			}}
		/>
	)
}
