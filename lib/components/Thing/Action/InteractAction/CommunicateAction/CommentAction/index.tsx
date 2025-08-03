import type BaseProps from "../../../../../../types/index.ts"
import type { CommentAction as CommentActionProps } from "../../../../../../types/index.ts"

import CommunicateAction from "../index.tsx"

export type Props = CommentActionProps & BaseProps

export default function CommentAction({
	_type = "CommentAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
