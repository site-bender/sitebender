import type BaseProps from "../../../../../types/index.ts"
import type { CorrectionComment as CorrectionCommentProps } from "../../../../../types/index.ts"

import Comment from "../index.tsx"

export type Props = CorrectionCommentProps & BaseProps

export default function CorrectionComment({
	_type = "CorrectionComment",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
