import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CommentActionProps from "../../../../../../types/Thing/CommentAction/index.ts"
import type CommunicateActionProps from "../../../../../../types/Thing/CommunicateAction/index.ts"

import CommunicateAction from "../index.tsx"

export type Props = BaseComponentProps<
	CommentActionProps,
	"CommentAction",
	ExtractLevelProps<CommentActionProps, CommunicateActionProps>
>

export default function CommentAction(
	{
		resultComment,
		schemaType = "CommentAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CommunicateAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				resultComment,
				...subtypeProperties,
			}}
		/>
	)
}
