import type BaseProps from "../../../../../../types/index.ts"
import type CommentActionProps from "../../../../../../types/Thing/Action/InteractAction/CommunicateAction/CommentAction/index.ts"

import CommunicateAction from "../index.tsx"

export type Props = CommentActionProps & BaseProps

export default function CommentAction({
	resultComment,
	_type = "CommentAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CommunicateAction
			{...props}
			_type={_type}
			subtypeProperties={{
				resultComment,
				...subtypeProperties,
			}}
		>
			{children}
		</CommunicateAction>
	)
}
