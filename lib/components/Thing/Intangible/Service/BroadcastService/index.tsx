import type BaseProps from "../../../../../types/index.ts"
import type BroadcastServiceProps from "../../../../../types/Thing/Intangible/Service/BroadcastService/index.ts"

import Service from "../index.tsx"

export type Props = BroadcastServiceProps & BaseProps

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
	_type = "BroadcastService",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Service
			{...props}
			_type={_type}
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
		>
			{children}
		</Service>
	)
}
