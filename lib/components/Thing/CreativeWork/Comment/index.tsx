import type BaseProps from "../../../../types/index.ts"
import type { Comment as CommentProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = CommentProps & BaseProps

export default function Comment({
	_type = "Comment",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
