import type BaseProps from "../../../../../types/index.ts"
import type EmailMessageProps from "../../../../../types/Thing/CreativeWork/Message/EmailMessage/index.ts"

import Message from "../index.tsx"

export type Props = EmailMessageProps & BaseProps

export default function EmailMessage({
	_type = "EmailMessage",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Message
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Message>
	)
}
