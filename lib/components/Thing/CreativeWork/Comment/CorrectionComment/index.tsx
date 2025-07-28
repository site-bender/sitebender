import type BaseProps from "../../../../../types/index.ts"
import type { CorrectionCommentProps } from "../../../../../types/Thing/CreativeWork/Comment/CorrectionComment/index.ts"

import Comment from "../index.tsx"

export type Props = CorrectionCommentProps & BaseProps

export default function CorrectionComment({
	_type = "CorrectionComment",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Comment
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
