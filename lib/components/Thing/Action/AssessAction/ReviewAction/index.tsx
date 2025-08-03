import type BaseProps from "../../../../../types/index.ts"
import type { ReviewAction as ReviewActionProps } from "../../../../../types/index.ts"

import AssessAction from "../index.tsx"

export type Props = ReviewActionProps & BaseProps

export default function ReviewAction({
	_type = "ReviewAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
