import type BaseProps from "../../../../../types/index.ts"
import type { AggregateRating as AggregateRatingProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = AggregateRatingProps & BaseProps

export default function AggregateRating({
	_type = "AggregateRating",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
