import type BaseProps from "../../../../../../types/index.ts"
import type { ClaimReview as ClaimReviewProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ClaimReviewProps & BaseProps

export default function ClaimReview({
	_type = "ClaimReview",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
