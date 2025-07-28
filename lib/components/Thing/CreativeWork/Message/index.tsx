import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { MessageProps } from "../../../../types/Thing/CreativeWork/Message/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	MessageProps,
	"Message",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

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
	schemaType = "Message",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
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
