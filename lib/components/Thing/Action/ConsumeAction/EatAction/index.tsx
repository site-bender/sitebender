import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ConsumeActionProps from "../../../../../types/Thing/ConsumeAction/index.ts"
import type EatActionProps from "../../../../../types/Thing/EatAction/index.ts"

import ConsumeAction from "../index.tsx"

// EatAction adds no properties to the ConsumeAction schema type
export type Props = BaseComponentProps<
	EatActionProps,
	"EatAction",
	ExtractLevelProps<EatActionProps, ConsumeActionProps>
>

export default function EatAction({
	schemaType = "EatAction",
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
