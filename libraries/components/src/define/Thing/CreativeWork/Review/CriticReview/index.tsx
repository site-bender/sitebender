import type BaseProps from "../../../../../types/index.ts"
import type { CriticReview as CriticReviewProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = CriticReviewProps & BaseProps

export default function CriticReview({
	_type = "CriticReview",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
