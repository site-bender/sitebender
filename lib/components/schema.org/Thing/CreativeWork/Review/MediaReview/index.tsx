import type BaseProps from "../../../../../types/index.ts"
import type { MediaReview as MediaReviewProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MediaReviewProps & BaseProps

export default function MediaReview({
	_type = "MediaReview",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
