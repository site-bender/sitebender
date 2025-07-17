import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BroadcastChannelProps from "../../../../../types/Thing/BroadcastChannel/index.ts"
import type TelevisionChannelProps from "../../../../../types/Thing/TelevisionChannel/index.ts"

import BroadcastChannel from "../index.tsx"

// TelevisionChannel adds no properties to the BroadcastChannel schema type
export type Props = BaseComponentProps<
	TelevisionChannelProps,
	"TelevisionChannel",
	ExtractLevelProps<TelevisionChannelProps, BroadcastChannelProps>
>

export default function TelevisionChannel({
	schemaType = "TelevisionChannel",
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
