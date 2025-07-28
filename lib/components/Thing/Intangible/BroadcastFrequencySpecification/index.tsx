import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { BroadcastFrequencySpecificationProps } from "../../../../types/Thing/Intangible/BroadcastFrequencySpecification/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	BroadcastFrequencySpecificationProps,
	"BroadcastFrequencySpecification",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function BroadcastFrequencySpecification({
	broadcastFrequencyValue,
	broadcastSignalModulation,
	broadcastSubChannel,
	schemaType = "BroadcastFrequencySpecification",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				broadcastFrequencyValue,
				broadcastSignalModulation,
				broadcastSubChannel,
				...subtypeProperties,
			}}
		/>
	)
}
