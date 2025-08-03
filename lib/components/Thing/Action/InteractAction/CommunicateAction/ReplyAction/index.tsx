import type BaseProps from "../../../../../../types/index.ts"
import type { ReplyAction as ReplyActionProps } from "../../../../../../types/index.ts"

import CommunicateAction from "../index.tsx"

export type Props = ReplyActionProps & BaseProps

export default function ReplyAction({
	_type = "ReplyAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
