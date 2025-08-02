import type BaseProps from "../../../../types/index.ts"
import type BroadcastChannelProps from "../../../../types/Thing/Intangible/BroadcastChannel/index.ts"

import Intangible from "../index.tsx"

export type Props = BroadcastChannelProps & BaseProps

export default function BroadcastChannel({
	broadcastChannelId,
	broadcastFrequency,
	broadcastServiceTier,
	genre,
	inBroadcastLineup,
	providesBroadcastService,
	_type = "BroadcastChannel",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				broadcastChannelId,
				broadcastFrequency,
				broadcastServiceTier,
				genre,
				inBroadcastLineup,
				providesBroadcastService,
				...subtypeProperties,
			}}
		>
			{children}
		</Intangible>
	)
}
