import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EmailMessageProps from "../../../../../types/Thing/EmailMessage/index.ts"
import type MessageProps from "../../../../../types/Thing/Message/index.ts"

import Message from "./index.tsx"

// EmailMessage adds no properties to the Message schema type
export type Props = BaseComponentProps<
	EmailMessageProps,
	"EmailMessage",
	ExtractLevelProps<EmailMessageProps, MessageProps>
>

export default function EmailMessage({
	schemaType = "EmailMessage",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Message
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
