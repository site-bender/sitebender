import type BaseProps from "../../../../types/index.ts"
import type ConversationProps from "../../../../types/Thing/CreativeWork/Conversation/index.ts"

import CreativeWork from "../index.tsx"

export type Props = ConversationProps & BaseProps

export default function Conversation({
	_type = "Conversation",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
