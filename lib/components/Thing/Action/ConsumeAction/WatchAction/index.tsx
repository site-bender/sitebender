import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ConsumeActionProps from "../../../../../types/Thing/ConsumeAction/index.ts"
import type WatchActionProps from "../../../../../types/Thing/WatchAction/index.ts"

import ConsumeAction from "./index.tsx"

// WatchAction adds no properties to the ConsumeAction schema type
export type Props = BaseComponentProps<
	WatchActionProps,
	"WatchAction",
	ExtractLevelProps<WatchActionProps, ConsumeActionProps>
>

export default function WatchAction({
	schemaType = "WatchAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<ConsumeAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
