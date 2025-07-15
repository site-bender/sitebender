import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CommentProps from "../../../../../types/Thing/Comment/index.ts"
import type CorrectionCommentProps from "../../../../../types/Thing/CorrectionComment/index.ts"

import Comment from "./index.tsx"

// CorrectionComment adds no properties to the Comment schema type
export type Props = BaseComponentProps<
	CorrectionCommentProps,
	"CorrectionComment",
	ExtractLevelProps<CorrectionCommentProps, CommentProps>
>

export default function CorrectionComment({
	schemaType = "CorrectionComment",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Comment
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
