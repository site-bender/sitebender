import type BaseProps from "../../../../types/index.ts"
import type MediaReviewItemProps from "../../../../types/Thing/CreativeWork/MediaReviewItem/index.ts"

import CreativeWork from "../index.tsx"

export type Props = MediaReviewItemProps & BaseProps

export default function MediaReviewItem({
	mediaItemAppearance,
	_type = "MediaReviewItem",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				mediaItemAppearance,
				...subtypeProperties,
			}}
		>{children}</CreativeWork>
	)
}
