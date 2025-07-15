import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ConsumeActionProps from "../../../../../types/Thing/ConsumeAction/index.ts"
import type ListenActionProps from "../../../../../types/Thing/ListenAction/index.ts"

import ConsumeAction from "./index.tsx"

// ListenAction adds no properties to the ConsumeAction schema type
export type Props = BaseComponentProps<
	ListenActionProps,
	"ListenAction",
	ExtractLevelProps<ListenActionProps, ConsumeActionProps>
>

export default function ListenAction({
	schemaType = "ListenAction",
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
