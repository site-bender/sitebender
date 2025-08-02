import type BaseProps from "../../../../../types/index.ts"
import type RadioChannelProps from "../../../../../types/Thing/Intangible/BroadcastChannel/RadioChannel/index.ts"

import BroadcastChannel from "../index.tsx"

export type Props = RadioChannelProps & BaseProps

export default function RadioChannel({
	_type = "RadioChannel",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<BroadcastChannel
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</BroadcastChannel>
	)
}
