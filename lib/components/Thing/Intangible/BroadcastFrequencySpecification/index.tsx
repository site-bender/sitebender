import type BaseProps from "../../../../types/index.ts"
import type { BroadcastFrequencySpecificationProps } from "../../../../types/Thing/Intangible/BroadcastFrequencySpecification/index.ts"

import Intangible from "../index.tsx"

export type Props = BroadcastFrequencySpecificationProps & BaseProps

export default function BroadcastFrequencySpecification({
	broadcastFrequencyValue,
	broadcastSignalModulation,
	broadcastSubChannel,
	_type = "BroadcastFrequencySpecification",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				broadcastFrequencyValue,
				broadcastSignalModulation,
				broadcastSubChannel,
				...subtypeProperties,
			}}
		/>
	)
}
