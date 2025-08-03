import type BaseProps from "../../../../types/index.ts"
import type { MediaReviewItem as MediaReviewItemProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = MediaReviewItemProps & BaseProps

export default function MediaReviewItem({
	_type = "MediaReviewItem",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
