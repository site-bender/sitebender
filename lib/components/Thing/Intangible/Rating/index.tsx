import type BaseProps from "../../../../types/index.ts"
import type { Rating as RatingProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = RatingProps & BaseProps

export default function Rating({
	_type = "Rating",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
