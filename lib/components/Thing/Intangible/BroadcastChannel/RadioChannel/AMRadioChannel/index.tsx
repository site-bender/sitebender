import type BaseProps from "../../../../../../types/index.ts"
import type AMRadioChannelProps from "../../../../../../types/Thing/Intangible/BroadcastChannel/RadioChannel/AMRadioChannel/index.ts"

import RadioChannel from "../index.tsx"

export type Props = AMRadioChannelProps & BaseProps

export default function AMRadioChannel({
	_type = "AMRadioChannel",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<RadioChannel
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</RadioChannel>
	)
}
