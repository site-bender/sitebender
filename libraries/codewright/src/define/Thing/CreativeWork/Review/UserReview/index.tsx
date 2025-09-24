import type BaseProps from "../../../../../../types/index.ts"
import type { UserReview as UserReviewProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = UserReviewProps & BaseProps

export default function UserReview({
	_type = "UserReview",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
