import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BroadcastServiceProps from "../../../../../types/Thing/BroadcastService/index.ts"
import type ServiceProps from "../../../../../types/Thing/Service/index.ts"

import Service from "./index.tsx"

export type Props = BaseComponentProps<
	BroadcastServiceProps,
	"BroadcastService",
	ExtractLevelProps<BroadcastServiceProps, ServiceProps>
>

export default function BroadcastService(
	{
		area,
		broadcastAffiliateOf,
		broadcastDisplayName,
		broadcastFrequency,
		broadcastTimezone,
		broadcaster,
		callSign,
		hasBroadcastChannel,
		inLanguage,
		parentService,
		videoFormat,
		schemaType = "BroadcastService",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Service
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				area,
				broadcastAffiliateOf,
				broadcastDisplayName,
				broadcastFrequency,
				broadcastTimezone,
				broadcaster,
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
