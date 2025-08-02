import type BaseProps from "../../../../../types/index.ts"
import type TelevisionChannelProps from "../../../../../types/Thing/Intangible/BroadcastChannel/TelevisionChannel/index.ts"

import BroadcastChannel from "../index.tsx"

export type Props = TelevisionChannelProps & BaseProps

export default function TelevisionChannel({
	_type = "TelevisionChannel",
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
