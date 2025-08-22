import type BaseProps from "../../../../../../types/index.ts"
import type { EmployerAggregateRating as EmployerAggregateRatingProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = EmployerAggregateRatingProps & BaseProps

export default function EmployerAggregateRating({
	_type = "EmployerAggregateRating",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
