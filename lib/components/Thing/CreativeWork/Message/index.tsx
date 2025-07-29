import type BaseProps from "../../../../types/index.ts"
import type MessageProps from "../../../../types/Thing/CreativeWork/Message/index.ts"

import CreativeWork from "../index.tsx"

export type Props = MessageProps & BaseProps

export default function Message({
	bccRecipient,
	ccRecipient,
	dateRead,
	dateReceived,
	dateSent,
	messageAttachment,
	recipient,
	sender,
	toRecipient,
	_type = "Message",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				bccRecipient,
				ccRecipient,
				dateRead,
				dateReceived,
				dateSent,
				messageAttachment,
				recipient,
				sender,
				toRecipient,
				...subtypeProperties,
			}}
		/>
	)
}
