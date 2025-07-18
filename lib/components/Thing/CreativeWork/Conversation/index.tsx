import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ConversationProps from "../../../../types/Thing/Conversation/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"

import CreativeWork from "../index.tsx"

// Conversation adds no properties to the CreativeWork schema type
export type Props = BaseComponentProps<
	ConversationProps,
	"Conversation",
	ExtractLevelProps<ConversationProps, CreativeWorkProps>
>

export default function Conversation({
	schemaType = "Conversation",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
