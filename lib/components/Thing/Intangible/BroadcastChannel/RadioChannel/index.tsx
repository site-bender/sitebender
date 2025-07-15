import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BroadcastChannelProps from "../../../../../types/Thing/BroadcastChannel/index.ts"
import type RadioChannelProps from "../../../../../types/Thing/RadioChannel/index.ts"

import BroadcastChannel from "./index.tsx"

// RadioChannel adds no properties to the BroadcastChannel schema type
export type Props = BaseComponentProps<
	RadioChannelProps,
	"RadioChannel",
	ExtractLevelProps<RadioChannelProps, BroadcastChannelProps>
>

export default function RadioChannel({
	schemaType = "RadioChannel",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<BroadcastChannel
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
