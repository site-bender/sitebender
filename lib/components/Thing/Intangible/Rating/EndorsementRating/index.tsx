import type BaseProps from "../../../../../types/index.ts"
import type { EndorsementRating as EndorsementRatingProps } from "../../../../../types/index.ts"

import Rating from "../index.tsx"

export type Props = EndorsementRatingProps & BaseProps

export default function EndorsementRating({
	_type = "EndorsementRating",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
