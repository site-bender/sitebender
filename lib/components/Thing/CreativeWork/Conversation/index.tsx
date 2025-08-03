import type BaseProps from "../../../../types/index.ts"
import type { Conversation as ConversationProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = ConversationProps & BaseProps

export default function Conversation({
	_type = "Conversation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
