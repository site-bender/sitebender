import type BaseProps from "../../../../../types/index.ts"
import type { EmployerReview as EmployerReviewProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = EmployerReviewProps & BaseProps

export default function EmployerReview({
	_type = "EmployerReview",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
