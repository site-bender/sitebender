import type BaseProps from "../../../../../../types/index.ts"
import type FMRadioChannelProps from "../../../../../../types/Thing/Intangible/BroadcastChannel/RadioChannel/FMRadioChannel/index.ts"

import RadioChannel from "../index.tsx"

export type Props = FMRadioChannelProps & BaseProps

export default function FMRadioChannel({
	_type = "FMRadioChannel",
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
		/>
	)
}
