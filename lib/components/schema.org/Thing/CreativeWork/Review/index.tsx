import type BaseProps from "../../../../types/index.ts"
import type { Review as ReviewProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ReviewProps & BaseProps

export default function Review({
	_type = "Review",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
